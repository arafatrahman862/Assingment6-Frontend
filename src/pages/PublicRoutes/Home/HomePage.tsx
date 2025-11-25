import CallToAction from "@/components/modules/HomePage/CallToAction";
import CustomerFeedbackMarquee from "@/components/modules/HomePage/CustomerFeedback";
import HeroSection from "@/components/modules/HomePage/HeroSection";
import HowItWorks from "@/components/modules/HomePage/HowItWorks";
import ServiceHighlights from "@/components/modules/HomePage/ServiceHighlights";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetAllFeedbacksQuery } from "@/redux/features/rides/rides.api";
import { BounceLoader } from "react-spinners";


export function HomePage() {
  const { data, isLoading } = useGetAllFeedbacksQuery(undefined);

  const { data:user, isLoading :isUserLoading } = useUserInfoQuery(undefined);

  if (isLoading && isUserLoading ) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <BounceLoader color="#f97316" size={80} />
      </div>
    );
  }

  const feedbacks = data?.data?.feedbacks || [];
  const totalRides = data?.data?.totalRides || 0;
  const userRole = user?.data?.role || "RIDER"

  return (
    <section>
      <HeroSection userRole={userRole}  />
      <ServiceHighlights totalRides={totalRides} />
      <CustomerFeedbackMarquee feedbacks={feedbacks} />
      <HowItWorks />
      <CallToAction userRole={userRole} />
    </section>
  );
}

