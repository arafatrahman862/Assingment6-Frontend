

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetDriverProfileQuery } from "@/redux/features/driver/driver.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";
import { BounceLoader } from "react-spinners";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const { data: driverData, isLoading: isDriverLoading } = useGetDriverProfileQuery(undefined, { skip: requiredRole !== "DRIVER" })

    const location = useLocation();

    if (isLoading || isDriverLoading) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <BounceLoader color="#f97316" size={80} />
        </div>
      );
    }

    const user = data?.data;
    const driver = driverData?.data

    console.log(driver)
    if (!user?.email) {
      return <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />;
    }

    if (driver?.driverStatus === "SUSPENDED") {
      return (
        <Navigate
          to="/contact-admin"
          state={{ reason: "Your Driver Account Has Been Suspended. Please Contact Admin." }}
          replace
        />
      );
    }

    if (user?.isBlocked === "BLOCKED") {
      return (
        <Navigate
          to="/contact-admin"
          state={{ reason: "Your Account Has Been Blocked. Please Contact Admin." }}
          replace
        />
      );
    }


    if (requiredRole && requiredRole !== user.role) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};
