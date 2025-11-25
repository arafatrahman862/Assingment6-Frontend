/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router";
import { useDriverNearMeQuery, useGetMyRideQuery, useGiveFeedbackMutation, usePayOnlineMutation } from "@/redux/features/rides/rides.api";
import RideTimeline from "@/components/RideTimeline";
import { BounceLoader } from "react-spinners";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangle, Star } from "lucide-react";

export default function MyRide() {
  const navigate = useNavigate()
  const { rideId } = useParams<{ rideId: string }>();
  const { data: rideData, isLoading: rideLoading } = useGetMyRideQuery(rideId!, {
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
  });

  console.log(rideData)

  const { data: driversData } = useDriverNearMeQuery(undefined, {
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
  });

  const [payOnline, { isLoading: isPaying }] = usePayOnlineMutation();
  const [giveFeedback, { isLoading: isSubmitting }] = useGiveFeedbackMutation()

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handlePayment = async (rideId: string) => {
    try {
      const res = await payOnline(rideId).unwrap();
      if (res.success) window.location.href = res.data.paymentUrl;
      toast.success("Payment Initiated!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to Initiate Payment");
    }
  };

  const ride = rideData?.data;
  const drivers = driversData?.data || [];
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

  // Leaflet marker setup
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  const orangeMarker = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const blueMarker = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    const fetchRoute = async () => {
      if (ride?.pickupLocation && ride?.destination && ride?.currentLocation) {
        try {
          const coords = `${ride.currentLocation.coordinates[0]},${ride.currentLocation.coordinates[1]};${ride.destination.coordinates[0]},${ride.destination.coordinates[1]}`;
          const res = await axios.get(`https://router.project-osrm.org/route/v1/driving/${coords}?geometries=geojson`);
          const route = res.data.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
          setRouteCoords(route);
        } catch (err) {
          console.error("Error fetching route:", err);
        }
      }
    };
    fetchRoute();
  }, [ride]);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (ride?.pickupLocation && ride?.destination && ride?.currentLocation) {
        try {
          const pickupRes = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${ride.currentLocation.coordinates[1]}&lon=${ride.currentLocation.coordinates[0]}`);
          setPickupAddress(pickupRes.data.display_name);
          const destRes = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${ride.destination.coordinates[1]}&lon=${ride.destination.coordinates[0]}`);
          setDestinationAddress(destRes.data.display_name);
        } catch (err) {
          console.error("Error fetching addresses:", err);
        }
      }
    };
    fetchAddresses();
  }, [ride]);

  const handleFeedbackSubmit = async () => {
    if (!ride) return;

    try {
      await giveFeedback({
        rideId: ride._id,
        feedback: {
          rating,
          feedback: feedback,
        },
      }).unwrap();

      toast.success("Feedback Submitted!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!");
    }
  };

  const handleSOS = () => {
    if (!ride) return;

    const [lat, lon] = [ride.currentLocation.coordinates[1], ride.currentLocation.coordinates[0]];

    const message = encodeURIComponent(
      `I am in danger! Please help me.\nMy current location: https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
    );

    const phone = "8801639768727";
    const whatsappURL = `https://wa.me/${phone}?text=${message}`;

    window.open(whatsappURL, "_blank");
  };



  if (rideLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <BounceLoader color="#f97316" size={80} />
      </div>
    );
  }

  if (!ride) return <div className="min-h-screen flex justify-center items-center"><p>No ride data found.</p></div>;

  const locationCoords: [number, number] = [ride.currentLocation.coordinates[1], ride.currentLocation.coordinates[0]];
  const pickupCoords: [number, number] = [ride.pickupLocation.coordinates[1], ride.pickupLocation.coordinates[0]];
  const destinationCoords: [number, number] = [ride.destination.coordinates[1], ride.destination.coordinates[0]];

  return (
    <>
      <section className="container mx-auto max-w-4xl mt-20 p-4 mb-10">
        <div className="shadow-lg overflow-hidden flex flex-col gap-4">
          <div className="z-10 min-w-[400px] h-[350px] relative">
            <MapContainer center={locationCoords} zoom={14} className="h-full w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
              <Marker position={locationCoords} icon={orangeMarker} />
              <Marker position={destinationCoords} icon={orangeMarker} />
              {drivers.map((driver: any, idx: number) => (
                <Marker key={idx} position={[driver.currentLocation.coordinates[1], driver.currentLocation.coordinates[0]]} icon={blueMarker} />
              ))}
              {routeCoords.length > 0 && <Polyline positions={routeCoords} color="orange" weight={5} />}
            </MapContainer>
          </div>

          <div className="w-full p-4 shadow-lg border flex flex-col md:flex-row justify-around">
            <RideTimeline ride={ride} />
            <div className="flex flex-col w-full">
              <div className="mt-6 space-y-4">
                <h1 className="uppercase font-bold underline mb-6">Ride Details</h1>
                <p className="text-sm"><strong className="text-primary">Distance:</strong> {ride.travelDistance} km</p>
                <p className="text-sm"><strong className="text-primary">Fare:</strong> {ride.fare} BDT</p>
                <p className="text-sm"><strong className="text-primary">Pickup:</strong> {pickupAddress || `${pickupCoords[0]}, ${pickupCoords[1]}`}</p>
                <p className="text-sm"><strong className="text-primary">Destination:</strong> {destinationAddress || `${destinationCoords[0]}, ${destinationCoords[1]}`}</p>
                {ride.rideStatus === "ACCEPTED" && ride.driverId?.userId && (
                  <div className="mt-4 p-4 border shadow flex items-center gap-4">
                    <img
                      src={ride.driverId.userId.picture || "/default-driver.png"}
                      alt={ride.driverId.userId.name}
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">{ride.driverId.userId.name}</p>
                      <p className="text-sm text-gray-600">{ride.driverId.vehicle?.vehicleNumber}</p>
                    </div>
                    <a
                      href={`tel:${ride.driverId.userId.phone}`}
                      className="ml-auto px-2 py-2 bg-green-600 text-white hover:bg-green-700 text-xs rounded-none"
                    >
                      Call Driver
                    </a>
                  </div>
                )}

              </div>

              {ride.rideStatus === "ARRIVED" && (
                <div className="mt-6">
                  <div className="border mb-6 p-2">
                    <h1 className="text-sm">
                      If Your Are Willing To <span className="text-primary">Pay In Cash</span> Give The Cash To Driver He Will Mark as Completed and You Will Receive a <span className="text-primary">Invoice</span> !
                    </h1>
                  </div>
                  <Button disabled={rideLoading || isPaying} onClick={() => handlePayment(ride._id)} className="bg-green-500 hover:bg-green-600 text-white rounded-none mb-6">
                    {isPaying ? "Payment In Process" : "Pay Online"}
                  </Button>
                </div>
              )}

              {ride.rideStatus === "COMPLETED" && (
                <div className="mt-6 flex flex-col gap-2">
                  <h2 className="font-bold text-sm uppercase underline text-primary">Rate & Feedback</h2>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={24}
                        className={`cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-400"}`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Write your feedback"
                    className="border p-2 rounded-none mt-2"
                  />
                  <Button disabled={rideLoading} onClick={handleFeedbackSubmit} className="mt-2 rounded-none">
                    {isSubmitting ? "Submitting Feedback..." : "Give Feedback"}
                  </Button>
                  <Button disabled={rideLoading} onClick={() => navigate("/")} className="mt-2 rounded-none">
                    Go Home
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {ride.rideStatus === "IN_TRANSIT" && (
          <Button
            onClick={handleSOS}
            className="fixed right-6 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white px-6 py-8 shadow-lg z-50 flex flex-col"
          >
            <AlertTriangle className="h-5 w-5" />
            SOS
          </Button>
        )}
      </section>
    </>
  );
}
