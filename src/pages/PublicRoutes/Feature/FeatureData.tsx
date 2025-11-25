import { User, MapPin, Car, CreditCard, AlertCircle, Star, Mail, Clock, Shield } from "lucide-react";

export const driverFeatures = [
  {
    icon: <User size={60} className="text-blue-400" />,
    title: "Driver Profile",
    description: "Manage your profile, vehicle info, license documents, and approval status.",
  },
  {
    icon: <MapPin size={60} className="text-green-400" />,
    title: "Nearby Ride Requests",
    description: "See ride requests near you and accept or reject them in real-time.",
  },
  {
    icon: <Car size={60} className="text-yellow-400" />,
    title: "Ride Lifecycle",
    description: "Update ride status: Accepted → Picked Up → In Transit → Completed.",
  },
  {
    icon: <Car size={60} className="text-yellow-400" />,
    title: "Ride Tracking",
    description: "Track your ride in real-time until the ride is completed.",
  },
  {
    icon: <CreditCard size={60} className="text-purple-400" />,
    title: "Earnings & Payment",
    description: "Track ride earnings, receive secure payments, and monitor stats.",
  },
  {
    icon: <CreditCard size={60} className="text-purple-400" />,
    title: "Maximum Revenue",
    description: "Automatically Revenue will be added in your account with maximum profit",
  },
  {
    icon: <Clock size={60} className="text-indigo-400" />,
    title: "Ride History",
    description: "Access complete history of all completed rides for reference and analysis.",
  },
  {
    icon: <Star size={60} className="text-orange-400" />,
    title: "Ratings & Feedback",
    description: "View rider ratings and feedback to improve service quality.",
  },
  {
    icon: <Shield size={60} className="text-red-400" />,
    title: "Security",
    description: "JWT-based login, password reset, and role-based access control.",
  },
];

export const riderFeatures = [
  {
    icon: <User size={60} className="text-blue-400" />,
    title: "Rider Profile",
    description: "Manage your profile, phone number, and current location.",
  },
  {
    icon: <MapPin size={60} className="text-green-400" />,
    title: "Request Rides",
    description: "Set pickup and destination to request rides quickly any of the driver will accept your ride.",
  },
  {
    icon: <Car size={60} className="text-yellow-400" />,
    title: "Ride Tracking",
    description: "Track your driver in real-time until the ride is completed.",
  },
  {
    icon: <CreditCard size={60} className="text-purple-400" />,
    title: "Payment Options",
    description: "Pay online or offline securely after ride completion.",
  },
  {
    icon: <Mail size={60} className="text-pink-400" />,
    title: "Automated Billing",
    description: "Receive ride bills and invoices automatically via email after every ride.",
  },
  {
    icon: <Clock size={60} className="text-indigo-400" />,
    title: "Ride History",
    description: "Access complete history of all your rides including cancellations and completed trips.",
  },
  {
    icon: <Star size={60} className="text-orange-400" />,
    title: "Ratings & Feedback",
    description: "Give feedback and rate drivers for every completed ride.",
  },
  {
    icon: <AlertCircle size={60} className="text-red-400" />,
    title: "SOS & Safety",
    description: "Trigger SOS in emergencies for immediate help and much safer than any services available.",
  },
  {
    icon: <Shield size={60} className="text-red-400" />,
    title: "Security",
    description: "JWT-based login, password reset, and role-based access control.",
  },
];
