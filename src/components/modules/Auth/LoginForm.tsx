/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { Link, useNavigate} from "react-router";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();



  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, {isLoading}] = useLoginMutation();

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await login(data).unwrap();
      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Invalid credentials");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${config.baseUrl}/auth/google`;
  };

  return (
    <div className={cn("flex flex-col gap-6 text-white", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-bold text-white">Login to your account</h1>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none text-white placeholder:text-gray-300"
                      placeholder="Your Email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none text-white placeholder:text-gray-300"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage  />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full rounded-none">
              {isLoading? "Logging In..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-white">
          <h1>Or continue with</h1>
        </div>

        <Button
          onClick={handleGoogleLogin}
          type="button"
          variant="outline"
          className="w-full cursor-pointer rounded-none text-white border-white bg-transparent hover:bg-transparent hover:text-primary"
        >
          Login with Google
        </Button>
      </div>

      <div className="text-center text-sm text-white">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4 text-white">
          Register
        </Link>
      </div>
    </div>
  );
}
