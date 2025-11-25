import { User, MapPin, Car } from "lucide-react";
import how from "@/assets/images/how.jpg";

export default function HowItWorks() {
  return (
    <section className="relative mt-10 py-10 px-6 md:px-10">
      <div className="absolute inset-0 w-full h-full">
        <img
          src={how}
          alt="How it works background"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-4">
          How It Works
        </h2>
        <p className="text-sm md:text-md lg:text-lg text-gray-200">
          Follow these simple steps to get your ride quickly and conveniently
        </p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
        <div className="lg:flex-1 flex flex-col items-center justify-center text-center border p-2 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/10 backdrop-blur-sm ">
          <div className="w-24 h-24 flex items-center justify-center mb-5 rounded-full bg-blue-100">
            <User size={56} className="text-blue-500" />
          </div>
          <h3 className="text-md md:text-xl font-semibold mb-3 uppercase text-white">
            Sign Up or Login
          </h3>
          <p className="text-sm md:text-md text-gray-200 w-full">
            Create your account or login to start enjoying seamless rides
          </p>
        </div>

        <div className="lg:flex-1 flex flex-col gap-6">
          <div className="flex-1 flex flex-col items-center justify-center text-center border p-2 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/10 backdrop-blur-sm">
            <div className="w-24 h-24 flex items-center justify-center mb-5 rounded-full bg-green-100">
              <MapPin size={56} className="text-green-500" />
            </div>
            <h3 className="text-md md:text-xl font-semibold mb-3 uppercase text-white">
              Set Pickup & Destination
            </h3>
            <p className="text-sm md:text-md text-gray-200">
              Choose your starting point and destination for an optimized route
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center border p-2 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/10 backdrop-blur-sm">
            <div className="w-24 h-24 flex items-center justify-center mb-5 rounded-full bg-yellow-100">
              <Car size={56} className="text-yellow-500" />
            </div>
            <h3 className="text-md md:text-xl font-semibold mb-3 uppercase text-white">
              Start Your Ride
            </h3>
            <p className="text-sm md:text-md text-gray-200">
              Confirm your ride and enjoy a safe, fast, and reliable journey
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
