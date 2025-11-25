/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { driverApi } from "@/redux/features/driver/driver.api";
import { toast } from "sonner";

export default function GoOnline() {
  const [location, setLocation] = useState<{ type: string; coordinates: [number, number] } | null>(null);
  const [goOnline, { isLoading }] = driverApi.useGoOnlineMutation();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            type: "Point",
            coordinates: [pos.coords.longitude, pos.coords.latitude],
          });
        },
        () => toast.error("Failed to get your location"),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleGoOnline = async () => {
    if (!location) return toast.success("Fetching location, please wait...");
    try {
      await goOnline(location).unwrap();
      toast.success("You are now online!");
      console.log(location)
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to go online");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center  px-4 text-center gap-6">
      <h1 className="text-xl md:text-4xl font-bold uppercase">Mark Yourself Online!</h1>

      <Button
        onClick={handleGoOnline}
        disabled={isLoading}
        className="px-10 py-4 md:text-lg font-bold rounded-none  shadow-lg  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Going Online..." : "Go Online"}
      </Button>

      <p className="text-sm max-w-md">
        You must go online to see rides near you. Once online, riders will be able to request trips in your area.
      </p>
    </section>
  );
}
