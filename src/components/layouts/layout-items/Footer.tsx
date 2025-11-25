import Logo from "@/assets/icons/Logo";
import { role } from "@/constants/role";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Linkedin, MessageCircle, PhoneCall } from "lucide-react";
import { NavLink } from "react-router";



const contactIcons = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ride-sharing-app/",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/61419408349",
  },
  {
    icon: PhoneCall,
    label: "Call",
    href: "tel:+61419408349",
  },
];

export default function Footer() {
  const { data } = useUserInfoQuery(undefined);
  const user = data?.data;

  const navLinks = [
    { href: "/", label: "Home", role: "PUBLIC" },
    { href: "/features", label: "Features", role: "PUBLIC" },
    { href: "/about", label: "About", role: "PUBLIC" },
    { href: "/faq", label: "FAQ", role: "PUBLIC" },
    { href: "/contact", label: "Contact", role: "PUBLIC" },
  ];

  if (user) {
    if (user.role === "RIDER") {
      navLinks.push({ href: "/book-ride", label: "Book a Ride", role: role.rider});
      navLinks.push({ href: "/driver-register", label: "Become a Driver", role: role.rider });
      navLinks.push({ href: "/rider", label: "Dashboard", role: role.rider });
    } else if (user.role === "DRIVER") {
      navLinks.push({ href: "/start-driving", label: "Start Driving", role: role.driver });
      navLinks.push({ href: "/driver", label: "Dashboard", role: role.driver });
    } else if (user.role === "ADMIN") {
      navLinks.push({ href: "/admin", label: "Dashboard", role: role.admin });
    }
  }
  return (
    <footer className=" text-white px-6 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <p className="text-gray-300 max-w-xl mx-auto mb-6 text-sm md:text-base">
          RIDE-X is your trusted ride-sharing platform. Book rides instantly, track your journey in real-time,
          and enjoy safe and comfortable travel with our verified drivers across the city.
        </p>
        <ul className="flex flex-wrap justify-center gap-6 mb-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <NavLink
                to={href}
                end={href === "/"}
                className={({ isActive }) =>
                  `text-sm transition hover:text-primary ${isActive ? "text-primary font-semibold" : ""
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="flex justify-center gap-8 mb-6">
          {contactIcons.map(({ icon: Icon, href, label }) => (
            <li key={label}>
              <a
                href={href}
                target={label !== "Call" ? "_blank" : undefined}
                rel={label !== "Call" ? "noopener noreferrer" : undefined}
                aria-label={label}
                className=" hover:text-primary transition"
              >
                <Icon className="w-6 h-6" />
              </a>
            </li>
          ))}
        </ul>
        <div className="text-sm  border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-orange-600">RIDE-X Inc.</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
