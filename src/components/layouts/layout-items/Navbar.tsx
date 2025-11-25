import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import UserMenu from "@/components/user-menu";
import { ModeToggle } from "./ModeToggler";
import { Link, NavLink } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { role } from "@/constants/role";



export default function Header() {
  const { data } = useUserInfoQuery(undefined);
  const user = data?.data;


  const navigationLinks = [
    { href: "/", label: "Home", role: "PUBLIC" },
    { href: "/features", label: "Features", role: "PUBLIC" },
    { href: "/about", label: "About", role: "PUBLIC" },
    { href: "/faq", label: "FAQ", role: "PUBLIC" },
    { href: "/contact", label: "Contact", role: "PUBLIC" },
  ];

  if (user) {
    if (user.role === "RIDER") {
      navigationLinks.push({ href: "/book-ride", label: "Book a Ride", role: role.rider});
      navigationLinks.push({ href: "/driver-register", label: "Be a Driver", role: role.rider });
      navigationLinks.push({ href: "/rider", label: "Dashboard", role: role.rider });
    } else if (user.role === "DRIVER") {
      navigationLinks.push({ href: "/start-driving", label: "Start Driving", role: role.driver });
      navigationLinks.push({ href: "/driver", label: "Dashboard", role: role.driver });
    } else if (user.role === "ADMIN") {
      navigationLinks.push({ href: "/admin", label: "Dashboard", role: role.admin });
    }
  }
  return (
    <header className="px-4 md:px-6 bg-black/10 backdrop-blur-2xl z-100">
      <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                <svg
                  className="pointer-events-none "
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12L20 12" className="origin-center -translate-y-[7px] transition-all duration-300" />
                  <path d="M4 12H20" className="origin-center transition-all duration-300" />
                  <path d="M4 12H20" className="origin-center translate-y-[7px] transition-all duration-300" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden rounded-none">
              <div className="flex flex-col gap-2">
                {navigationLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    className={({ isActive }) =>
                      `py-1.5 px-2 rounded-none font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground"
                      } hover:text-primary`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex items-center gap-6">
            <NavLink to="/">
              <Logo />
            </NavLink>
            <div className="hidden md:flex gap-4">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `py-1.5 px-2 font-medium transition-colors ${isActive ? "text-primary" : "text-white hover:scale-105"
                    } hover:text-primary`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {data?.data?.email && (
            <UserMenu data={data} />
          )}
          {!data?.data?.email && (
            <Button asChild className="text-sm rounded-none">
              <Link to="/login">Login</Link>
            </Button>
          )}

        </div>
      </div>
    </header>
  );

}
