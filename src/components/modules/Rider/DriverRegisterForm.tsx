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
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SingleImageUploader from "@/components/SingleImageUploader";
import { toast } from "sonner";
import { useState } from "react";
import { useRegisterAsDriverMutation } from "@/redux/features/rides/rides.api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const registerSchema = z.object({
  vehicleNumber: z.string().min(1, "Vehicle number is required"),
  vehicleType: z.enum(["CAR", "BIKE"]).refine(
    (val) => val !== undefined,
    { message: "Vehicle type is required" }
  ),
});

export function DriverRegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [registerAsDriver, {isLoading}] = useRegisterAsDriverMutation();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      vehicleNumber: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    if (!image) return toast.error("Driving license image is required");

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        vehicle: {
          vehicleNumber: data.vehicleNumber,
          vehicleType: data.vehicleType,
        },
      })
    );
    formData.append("file", image);

    try {
      await registerAsDriver(formData).unwrap();
      toast.success("Driver registered successfully! please Wait for Admin Approval and If Approved Logout and then Login again to get driver accessibility!");
      navigate("/");
    } catch (err: any) {
      console.error(err);
      toast.error(err.data.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-bold">Register as a Driver</h1>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="vehicleNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Vehicle Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="DHAKA-METRO-XXX-XXXX"
                        {...field}
                        className="rounded-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>Vehicle Type</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="rounded-none w-full">
                          <SelectValue placeholder="Select Vehicle Type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          <SelectItem className="rounded-none" value="BIKE">Bike</SelectItem>
                          <SelectItem className="rounded-none" value="CAR">Car</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormItem className="mt-4 space-y-2">
              <FormLabel>Driving License</FormLabel>
              <FormControl>
                <SingleImageUploader onChange={setImage} />
              </FormControl>
            </FormItem>

            <Button type="submit" className="w-full rounded-none">
              {isLoading ?  "Submitting Information..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
