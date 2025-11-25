import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Award, Clock, Shield, Car } from "lucide-react";
import CountUp from "react-countup";
import service from "@/assets/images/service.jpg";

export default function ServiceHighlights({totalRides}: {totalRides:number}) {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const yearsInService = currentYear - startYear;

  const stats = [
    { icon: Award, number: yearsInService, suffix: "+", label: "Years of Service" },
    { icon: CheckCircle2, number: totalRides, suffix: "+", label: "Total Rides" },
  ];

  const highlights = [
    { icon: Car, label: "Fast Pickup", description: "Reach your destination quickly with optimized routes." },
    { icon: Clock, label: "24/7 Support", description: "Assistance available any time, any day." },
    { icon: Shield, label: "Safe Rides", description: "Every ride is monitored and secured for safety." },
  ];

  return (
    <section className="px-6 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-4">
            Reliable Ride Management
          </h2>
          <p className="">
            Seamless and safe transportation solutions. Track, manage, and optimize rides for riders and drivers with our cutting-edge platform.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="flex flex-col justify-center items-center w-full shadow-md p-7 text-center rounded-none bg-background gap-2"
              >
                <Icon className="w-12 h-12 text-orange-500" />
                <h3 className="text-sm md:text-xl font-semibold uppercase">{item.label}</h3>
                <p className="text-sm md:text-md ">{item.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          <div className="flex gap-0 lg:col-span-1 overflow-x-auto mb-10">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={idx}
                  className="bg-background flex flex-col justify-center items-center border-none rounded-none p-0 gap-0 min-w-[120px] flex-1 shadow-none"
                >
                  <CardContent className="text-center flex flex-col justify-center items-center p-0 gap-0">
                    <div className="flex justify-center mb-4">
                      <Icon className="w-12 h-12 text-primary" />
                    </div>
                    <div className="text-2xl md:text-4xl font-bold mb-1">
                      <CountUp end={stat.number} duration={2} />{stat.suffix}
                    </div>
                    <div className="text-xs md:text-sm uppercase tracking-wide mt-2">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="lg:col-span-2">
            <Card className="relative overflow-hidden rounded-none min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] bg-background border pt-10 px-2 md:px-4">
              <img
                src={service}
                alt="Ride management"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
              />
              <div className="absolute inset-0 w-full h-full z-10" />
              <CardContent className="relative z-20 h-full flex items-center justify-center p-0">
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 uppercase">
                    Simplify Your Rides
                  </h3>
                  <p className="text-sm md:text-base  mb-6 leading-relaxed">
                    Our platform ensures every ride is tracked, managed, and optimized for maximum safety and efficiency. Whether you are a rider or a driver, enjoy seamless experience with real-time updates.
                  </p>
                  <div className="">
                    <h4 className="text-lg md:text-xl font-semibold mb-3">
                      <span className="text-primary">Real-Time Tracking & Management</span>
                    </h4>
                    <p className="text-sm md:text-base text-gray-200 max-w-3xl mx-auto leading-relaxed">
                      Seamlessly monitor ride locations, driver availability, and real-time journey statuses across the entire transportation network. Leverage intelligent route optimization to minimize wait times, maximize efficiency, and ensure punctual arrivals for every ride. Experience unmatched convenience and reliability, with a fully integrated platform that empowers riders and drivers alike.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
