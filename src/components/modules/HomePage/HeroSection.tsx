import Logo from "@/assets/icons/Logo";
import hero from "@/assets/images/hero.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface HeroSectionProps {
  userRole: string;
}

export default function HeroSection({ userRole }: HeroSectionProps) {
  let heading = "";
  let description = "";

  switch (userRole) {
    case "RIDER":
      heading = "Your Ride, Ready When You Are";
      description =
        "Book in seconds, track every moment, and reach your destination with comfort, safety, and complete peace of mind.";
      break;
    case "DRIVER":
      heading = "Turn Every Drive Into an Earning Opportunity";
      description =
        "Take control of your time, accept rides instantly, and boost your income while helping people move across the city.";
      break;
    case "ADMIN":
      heading = "Stay in Control of Your Entire Ride Ecosystem";
      description =
        "Monitor rides in real time, manage users effortlessly, and keep the platform running smoothly with powerful admin tools.";
      break;
    default:
      heading = "A Smarter Way to Move Around the City";
      description =
        "Book comfortable rides, become a driver, and experience a modern, seamless transportation network built for everyone.";
  }

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center py-20 md:py-32">
      <div className="absolute inset-0 min-h-screen">
        <img
          alt="background"
          src={hero}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center text-center gap-6 max-w-5xl">
          <div className="rounded-xl p-4">
            <Logo />
          </div>

          <div>
            <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-snug uppercase">
              {heading}
            </h1>
            <p className="mx-auto max-w-3xl text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              {description}
            </p>
          </div>
          {userRole === "RIDER" && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center">
              <Link to="/book-ride">
                <Button className="w-full sm:w-auto px-6 py-3 rounded-none text-sm sm:text-base transition-transform duration-300 ease-in-out hover:scale-105">
                  Book a Ride
                </Button>
              </Link>
              <Link to="/driver-register">
                <Button className="w-full sm:w-auto px-6 py-3 rounded-none bg-white/10 hover:bg-white/15 hover:text-primary backdrop-blur-3xl text-sm sm:text-base transition-transform duration-300 ease-in-out hover:scale-105 text-white">
                  Become a Driver
                </Button>
              </Link>
            </div>
          )}

          {userRole === "DRIVER" && (
            <div className="mt-8">
              <Link to="/start-driving">
                <Button className="px-6 py-3 rounded-none text-sm sm:text-base transition-transform duration-300 ease-in-out hover:scale-105">
                  Start Driving
                </Button>
              </Link>
            </div>
          )}

          {userRole === "ADMIN" && (
            <div className="mt-8">
              <Link to="/admin/analytics">
                <Button className="px-6 py-3 rounded-none text-sm sm:text-base transition-transform duration-300 ease-in-out hover:scale-105">
                  Dashboard
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
