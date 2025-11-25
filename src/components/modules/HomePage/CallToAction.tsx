import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import ride from "@/assets/images/ride.jpg";

type CallToActionProps = {
  userRole: "RIDER" | "DRIVER" | "ADMIN";
};

export default function CallToAction({ userRole }: CallToActionProps) {
  const roleContent = {
    RIDER: {
      title: "Ready for Your Next Ride?",
      description:
        "Experience hassle-free rides with our cutting-edge ride management platform. Whether commuting daily, heading to work, or planning a weekend trip, we've got you covered with fast, reliable, and safe rides. Enjoy features like real-time tracking, professional drivers, instant booking, and 24/7 support.",
      buttonText: "Book a Ride",
      buttonLink: "/book-ride",
    },
    DRIVER: {
      title: "Join Our Driver Network",
      description:
        "Become a part of our growing platform and start earning with flexible hours, reliable support, and seamless ride requests. Enjoy features like real-time ride assignments, navigation support, and transparent earnings.",
      buttonText: "Start Driving",
      buttonLink: "/start-driving",
    },
    ADMIN: {
      title: "Manage the Platform",
      description:
        "Access the powerful admin dashboard to monitor rides, manage users, handle disputes, and keep the system running smoothly. Ensure a safe, efficient, and reliable experience for both drivers and riders.",
      buttonText: "Go to Dashboard",
      buttonLink: "/admin/analytics",
    },
  };

  const { title, description, buttonText, buttonLink } = roleContent[userRole];

  return (
    <section
      className="relative py-12 px-6 text-center overflow-hidden"
      style={{
        backgroundImage: `url(${ride})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 text-white container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-4">
          {title}
        </h2>
        <p className="text-sm md:text-base mb-5 max-w-5xl mx-auto">
          {description}
        </p>
        <Link to={buttonLink}>
          <Button className="w-auto px-6 py-3 bg-primary rounded-none text-sm sm:text-base font-bold transition-transform duration-300 ease-in-out hover:scale-105">
            {buttonText}
          </Button>
        </Link>
      </div>
    </section>
  );
}
