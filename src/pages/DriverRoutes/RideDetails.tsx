/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router";
import { BounceLoader } from "react-spinners";
import {
  useMarkArrivedMutation,
  usePayOfflineMutation,
  usePickupRideMutation,
  useSingleRideAcceptedByMeQuery,
  useStartRideMutation,
  useUpdateRideLocationMutation,
} from "@/redux/features/rides/rides.api";
import RideTimeline from "@/components/RideTimeline";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  useGetDriverProfileQuery,
  useUpdateDriverLocationMutation,
} from "@/redux/features/driver/driver.api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function RideDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: rideData, isLoading: rideLoading } =
    useSingleRideAcceptedByMeQuery(id, {
      pollingInterval: 5000,
      refetchOnMountOrArgChange: true,
    });
  const ride = rideData?.data;

  const { data: driverData, isLoading: driverLoading } =
    useGetDriverProfileQuery(undefined, {
      pollingInterval: 5000,
      refetchOnMountOrArgChange: true,
    });
  const driver = driverData?.data;

  const [driverCoords, setDriverCoords] = useState<[number, number] | null>(
    null
  );
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

  const [updateDriverLocation] = useUpdateDriverLocationMutation();
  const [updateRideLocation] = useUpdateRideLocationMutation();

  const [pickupRide, { isLoading: pickupLoading }] = usePickupRideMutation();
  const [startRide, { isLoading: startLoading }] = useStartRideMutation();
  const [markArrived, { isLoading: arrivedLoading }] = useMarkArrivedMutation();
  const [payOffline, { isLoading: paymentLoading }] = usePayOfflineMutation();

  const handlePickup = async (rideId: string) => {
    try {
      await pickupRide(rideId).unwrap();
      toast.success("Ride picked up successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to pickup ride");
    }
  };

  const handleStartRide = async (rideId: string) => {
    try {
      await startRide(rideId).unwrap();
      toast.success("Ride Started successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to Start ride");
    }
  };

  const handleMarkArrived = async (rideId: string) => {
    try {
      await markArrived(rideId).unwrap();
      toast.success("Arrived successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to Mark Arrived");
    }
  };

  const handlePayment = async (rideId: string) => {
    try {
      await payOffline(rideId).unwrap();
      toast.success("Cash Payment Received!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed Payment");
    }
  };

  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  const orangeMarker = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const blueMarker = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    if (driver?.currentLocation?.coordinates) {
      const [lon, lat] = driver.currentLocation.coordinates;
      setDriverCoords([lat, lon]);
    }
  }, [driver]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (ride?.currentLocation && ride?.destination) {
        try {
          const coords = [
            ride.currentLocation.coordinates,
            ride.destination.coordinates,
          ]
            .map((c) => `${c[0]},${c[1]}`)
            .join(";");

          const res = await axios.get(
            `https://router.project-osrm.org/route/v1/driving/${coords}?geometries=geojson`
          );

          const route = res.data.routes[0].geometry.coordinates.map(
            (c: [number, number]) => [c[1], c[0]]
          );
          setRouteCoords(route);
        } catch (err) {
          console.error("Error fetching route:", err);
        }
      }
    };
    fetchRoute();
  }, [ride?.currentLocation, ride?.destination]);


  useEffect(() => {
    const fetchAddresses = async () => {
      if (ride?.pickupLocation && ride?.destination) {
        try {
          const pickupRes = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${ride.currentLocation.coordinates[1]}&lon=${ride.currentLocation.coordinates[0]}`
          );
          setPickupAddress(pickupRes.data.display_name);

          const destRes = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${ride.destination.coordinates[1]}&lon=${ride.destination.coordinates[0]}`
          );
          setDestinationAddress(destRes.data.display_name);
        } catch (err) {
          console.error("Error fetching addresses:", err);
        }
      }
    };
    fetchAddresses();
  }, [ride]);

  useEffect(() => {
    if (!ride) return;

    let updating = false;
    let lastCoords: [number, number] | null = null;
    const MIN_DISTANCE = 0.0002;

    const getDistance = (c1: [number, number], c2: [number, number]) => {
      const dx = c1[0] - c2[0];
      const dy = c1[1] - c2[1];
      return Math.sqrt(dx * dx + dy * dy);
    };

    if (["ACCEPTED", "PICKED_UP", "IN_TRANSIT"].includes(ride.rideStatus)) {
      const watchId = navigator.geolocation.watchPosition(
        async (position) => {
          if (updating) return;

          const { latitude, longitude } = position.coords;
          const location: [number, number] = [longitude, latitude];

          setDriverCoords([latitude, longitude]);

          if (!lastCoords || getDistance(location, lastCoords) >= MIN_DISTANCE) {
            updating = true;
            try {
              await updateDriverLocation({
                type: "Point",
                coordinates: location,
              }).unwrap();

              if (ride.rideStatus === "IN_TRANSIT") {
                await updateRideLocation({
                  id: ride._id,
                  location: { type: "Point", coordinates: location },
                }).unwrap();
              }

              lastCoords = location;
            } catch (err) {
              console.error("Error updating location:", err);
            } finally {
              updating = false;
            }
          }
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [ride, updateDriverLocation, updateRideLocation]);

  if (rideLoading || driverLoading || !driverCoords) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <BounceLoader color="#f97316" size={80} />
      </div>
    );
  }

  if (!ride)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>No ride data found.</p>
      </div>
    );

  const pickupCoords: [number, number] = [
    ride.currentLocation.coordinates[1],
    ride.currentLocation.coordinates[0],
  ];
  const destinationCoords: [number, number] = [
    ride.destination.coordinates[1],
    ride.destination.coordinates[0],
  ];

  return (
    <>
        <section className="container mx-auto max-w-4xl mt-20 p-4 mb-10">
      <div className="shadow-lg overflow-hidden flex flex-col gap-4">
        {/* Map Section */}
        <div className="z-10 min-w-[400px] h-[350px] relative">
          <MapContainer center={driverCoords} zoom={14} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap"
            />
            <Marker position={driverCoords} icon={blueMarker} />
            <Marker position={pickupCoords} icon={orangeMarker} />
            <Marker position={destinationCoords} icon={orangeMarker} />
            {routeCoords.length > 0 && (
              <Polyline positions={routeCoords} color="orange" weight={5} />
            )}
          </MapContainer>
        </div>

        <div className="w-full p-4 shadow-lg border flex flex-col md:flex-row justify-around">
          <RideTimeline ride={ride} />
          <div className="flex flex-col w-full">
            <div className="mt-6 space-y-4">
              <h1 className="uppercase font-bold underline mb-6">Ride Details</h1>
              <p className="text-sm">
                <strong className="text-primary">Distance:</strong>{" "}
                {ride.travelDistance} km
              </p>
              <p className="text-sm">
                <strong className="text-primary">Fare:</strong> {ride.fare} BDT
              </p>
              <p className="text-sm">
                <strong className="text-primary">Pickup:</strong>{" "}
                {pickupAddress || `${pickupCoords[0]}, ${pickupCoords[1]}`}
              </p>
              <p className="text-sm">
                <strong className="text-primary">Destination:</strong>{" "}
                {destinationAddress || `${destinationCoords[0]}, ${destinationCoords[1]}`}
              </p>
            </div>

            <div className="mt-6">
              {ride.rideStatus === "ACCEPTED" && (
                <Button
                  disabled={pickupLoading || rideLoading}
                  onClick={() => handlePickup(ride._id)}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-none"
                >
                  {pickupLoading ? "Picking up..." : "Pickup Rider"}
                </Button>
              )}

              {ride.rideStatus === "ACCEPTED" && ride.riderId && (
                <div className="mt-4 p-4 border shadow flex items-center gap-4">
                  <img
                    src={ride.riderId.picture || "/default-driver.png"}
                    alt={ride.riderId.name}
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{ride.riderId.name}</p>
                    <p className="text-sm text-gray-600">{ride.riderId.phone}</p>
                  </div>
                  <a
                    href={`tel:${ride.riderId.phone}`}
                    className="ml-auto px-2 py-2 bg-green-600 text-white hover:bg-green-700 text-xs rounded-none"
                  >
                    Call Rider
                  </a>
                </div>
              )}


              {ride.rideStatus === "PICKED_UP" && (
                <Button
                  disabled={startLoading || rideLoading}
                  onClick={() => handleStartRide(ride._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-none"
                >
                  {startLoading ? "Starting..." : "Start Ride"}
                </Button>
              )}

              {ride.rideStatus === "IN_TRANSIT" && (
                <Button
                  disabled={arrivedLoading || rideLoading}
                  onClick={() => handleMarkArrived(ride._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-none"
                >
                  {arrivedLoading ? "Marking..." : "Mark as Arrived"}
                </Button>
              )}

              {ride.rideStatus === "ARRIVED" && (
                <>
                  <div className="border mb-6 p-2">
                    <h1 className="text-sm">
                      If Rider Willing To{" "}
                      <span className="text-primary">Pay In Cash</span> Hit This
                      Button to Mark Payment Received!
                    </h1>
                  </div>

                  <Button
                    disabled={paymentLoading}
                    onClick={() => handlePayment(ride._id)}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-none mb-6"
                  >
                    {paymentLoading ? "Creating payment..." : "Received Cash Payment"}
                  </Button>
                </>
              )}

              {ride.rideStatus === "COMPLETED" && (
                <Button
                  onClick={() => navigate("/start-driving")}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-none mb-6"
                >
                  Grab Another Ride!
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
