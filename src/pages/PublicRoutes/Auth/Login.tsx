import login from "@/assets/images/login.jpg";
import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";
import { LoginForm } from "@/components/modules/Auth/LoginForm";

export default function Login() {
  return (
    <>
      <section
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${login})` }}
      >
        <div className="absolute inset-0 bg-black/40 sm:bg-black/30 lg:bg-black/60" />

        <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-none 
                      bg-black/20 p-6 sm:p-8 shadow-lg backdrop-blur-3xl border">
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center gap-2 font-medium text-white text-lg sm:text-xl">
              <Logo />
            </Link>
          </div>
          <LoginForm />
        </div>
      </section>
    </>
  );
}
