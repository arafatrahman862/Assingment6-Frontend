import type { ReactNode } from "react";


interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center border p-4 md:p-6 shadow-lg">
      <div className="w-20 h-20 flex items-center justify-center mb-4 rounded-full">
        {icon}
      </div>
      <h3 className="text-md md:text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-sm md:text-md text-gray-200">{description}</p>
    </div>
  );
}
