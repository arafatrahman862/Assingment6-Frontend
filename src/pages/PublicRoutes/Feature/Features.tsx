import { useState } from "react";
import Breadcrumb from "@/components/layouts/Breadcrumb";
import featureImg from "@/assets/images/features.jpg";
import { driverFeatures, riderFeatures } from "./FeatureData";
import FeatureCard from "./FeatureCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Features() {
  const [tab, setTab] = useState<"driver" | "rider">("rider");

  const features = tab === "driver" ? driverFeatures : riderFeatures;

  return (
    <>
      <Breadcrumb
        title="Features"
        description="Discover the features that make our platform reliable and user-friendly."
        backgroundImage={featureImg}
      />

      <section className="max-w-7xl mx-auto  px-6">
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setTab("driver")}
            className={`px-6 py-2 text-xs font-semibold transition-colors border-r-0 rounded-none ${
              tab === "driver"
                ? "bg-primary text-white hover:bg-orange-600"
                : "bg-transparent border border-gray-300 hover:border-primary"
            }`}
            variant={tab === "driver" ? "default" : "outline"}
          >
            Driver
          </Button>
          <Button
            onClick={() => setTab("rider")}
            className={`px-6 py-2 text-xs font-semibold transition-colors rounded-none ${
              tab === "rider"
                ? "bg-primary text-white hover:bg-orange-600"
                : "bg-transparent border border-gray-300 hover:border-primary"
            }`}
            variant={tab === "rider" ? "default" : "outline"}
          >
            Rider
          </Button>
        </div>

        {/* Tab Description */}
        <Card className="rounded-none mb-8 bg-background">
          <CardContent className="p-4 sm:p-6">
            {tab === "driver" && (
              <p className="text-sm md:text-md leading-relaxed text-center">
                Drivers can manage rides efficiently with in-app navigation, ride requests, and earnings tracking. Our platform ensures fair payments, flexible working hours, and support.
              </p>
            )}
            {tab === "rider" && (
              <p className="text-sm md:text-md leading-relaxed text-center">
                Riders enjoy seamless booking, real-time tracking, and secure payments. Access affordable rides, track your journey live, and rate your driver for a safe and convenient experience.
              </p>
            )}
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {features.map((f, idx) => (
            <FeatureCard
              key={idx}
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          ))}
        </div>
      </section>
    </>
  );
}
