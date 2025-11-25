/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Breadcrumb from "@/components/layouts/Breadcrumb";
import featureImg from "@/assets/images/features.jpg";
import { BounceLoader } from "react-spinners";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSingleRideAcceptedByMeQuery } from "@/redux/features/rides/rides.api";
import axios from "axios";
import L from "leaflet";

export default function DriverRideDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: rideData, isLoading } = useSingleRideAcceptedByMeQuery(id, { pollingInterval: 3000 });
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

  const ride = rideData?.data;


  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });


  useEffect(() => {
    if (!ride) return;

    const fetchRoute = async () => {
      try {
        const coords = [
          ride.pickupLocation.coordinates.join(","),
          ride.destination.coordinates.join(","),
        ].join(";");

        const res = await axios.get(
          `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`
        );

        const route = res.data.routes[0].geometry.coordinates.map(
          (c: [number, number]) => [c[1], c[0]]
        );

        setRouteCoords(route);
      } catch (err) {
        console.error("Error fetching OSRM route:", err);
      }
    };

    fetchRoute();
  }, [ride]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <BounceLoader color="#f97316" size={80} />
      </div>
    );
  }

  if (!ride) {
    return <p className="text-center py-10">Ride not found.</p>;
  }

  const pickup: [number, number] = [
    ride.pickupLocation?.coordinates?.[1] ?? 0,
    ride.pickupLocation?.coordinates?.[0] ?? 0,
  ];
  const destination: [number, number] = [
    ride.destination?.coordinates?.[1] ?? 0,
    ride.destination?.coordinates?.[0] ?? 0,
  ];

  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleString() : "N/A";

  return (

    <>
      <Breadcrumb
        title="Ride Details"
        description="View full details of your accepted ride including map, route, and invoice."
        backgroundImage={featureImg}
      />
      <section className="max-w-7xl mx-auto p-4">

        <div className="flex flex-col lg:flex-row gap-6 mt-6 text-center lg:text-left">
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold underline uppercase">Ride Details</h1>
            <div className="text-sm">
              <strong className="text-primary">Distance:</strong>{" "}
              {ride.travelDistance?.toFixed(2) ?? "N/A"} km
            </div>
            <div className="text-sm">
              <strong className="text-primary">Fare:</strong> {ride.fare ?? "N/A"} ৳
            </div>
            <div className="text-sm">
              <strong className="text-primary">Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-none text-xs font-medium ${ride.rideStatus === "COMPLETED"
                  ? "bg-green-100 text-green-700"
                  : ride.rideStatus === "IN_TRANSIT"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                  }`}
              >
                {ride.rideStatus ?? "N/A"}
              </span>
            </div>
            <div className="text-sm">
              <strong className="text-primary">Driver:</strong>{" "}
              {ride.driverId?.vehicle?.vehicleNumber ?? "N/A"} {" "} || {" "}
              {ride.driverId?.vehicle?.vehicleType ?? ""}
            </div>
            <div>
              <strong className="underline">Timestamps:</strong>
              <ul className="mt-3">
                <li className="text-sm mt-1"><span className="text-primary">Requested:</span> {formatDate(ride.timestamps?.requestedAt)}</li>
                <li className="text-sm mt-1"><span className="text-primary">Accepted:</span> {formatDate(ride.timestamps?.acceptedAt)}</li>
                <li className="text-sm mt-1"><span className="text-primary">PickedUp:</span> {formatDate(ride.timestamps?.pickedUpAt)}</li>
                <li className="text-sm mt-1"><span className="text-primary">Started:</span> {formatDate(ride.timestamps?.startedAt)}</li>
                <li className="text-sm mt-1"><span className="text-primary">Completed:</span> {formatDate(ride.timestamps?.completedAt)}</li>
              </ul>
            </div>


          </div>
          <div className="flex-1 ">
            <MapContainer
              center={pickup}
              zoom={13}
              scrollWheelZoom={false}
              className="w-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:h-96 z-10"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={pickup} />
              <Marker position={destination} />
              {routeCoords.length > 0 && (
                <Polyline positions={routeCoords} color="blue" weight={5} />
              )}
            </MapContainer>
          </div>

        </div>
      </section>
    </>

  );
}
