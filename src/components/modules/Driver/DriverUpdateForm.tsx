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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SingleImageUploader from "@/components/SingleImageUploader";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useGetDriverProfileQuery, useUpdateDriverProfileMutation } from "@/redux/features/driver/driver.api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const driverSchema = z.object({
  vehicleNumber: z.string().min(1, "Vehicle number is required"),
  vehicleType: z.enum(["CAR", "BIKE"]).refine((val) => val !== undefined, {
    message: "Vehicle type is required",
  }),
});

export default function DriverUpdateForm({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { data: driverData, isLoading: isFetching } = useGetDriverProfileQuery(undefined);
  const driver = driverData?.data;

  const [updateDriver, { isLoading: isUpdating }] = useUpdateDriverProfileMutation();
  const [licenseImage, setLicenseImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof driverSchema>>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      vehicleNumber: driver?.vehicle?.vehicleNumber || "",
      vehicleType: driver?.vehicle?.vehicleType || undefined,
    },
  });

  useEffect(() => {
    if (driver) {
      form.reset({
        vehicleNumber: driver.vehicle?.vehicleNumber || "",
        vehicleType: driver.vehicle?.vehicleType || undefined,
      });
    }
  }, [driver, form]);

const onSubmit = async (data: z.infer<typeof driverSchema>) => {
  if (!driver) return;

  const formData = new FormData();

  const updatedVehicle: any = {};
  if (data.vehicleNumber !== driver.vehicle.vehicleNumber) updatedVehicle.vehicleNumber = data.vehicleNumber;
  if (data.vehicleType !== driver.vehicle.vehicleType) updatedVehicle.vehicleType = data.vehicleType;

  if (Object.keys(updatedVehicle).length > 0) {
    formData.append("vehicle", JSON.stringify(updatedVehicle));
  }

  if (licenseImage) {
    formData.append("file", licenseImage);
  }

  if (formData.entries().next().done) return toast("No changes detected");

  try {
    const res = await updateDriver(formData).unwrap();
    console.log(res);
    toast.success("Driver profile updated successfully");
  } catch (err: any) {
    console.error(err);
    toast.error(err.data?.message || "Failed to update driver profile");
  }
};


  if (isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-bold">Update Driver Info</h1>
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
                      <Input placeholder="Vehicle Number" {...field} className="rounded-none" />
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
                      <Select value={field.value} onValueChange={field.onChange}>
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
                <SingleImageUploader onChange={setLicenseImage} existingImage={driver?.drivingLicense || ""} />
              </FormControl>
            </FormItem>

            <Button type="submit" className="w-full rounded-none" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Driver Info"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
