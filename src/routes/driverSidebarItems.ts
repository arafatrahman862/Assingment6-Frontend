
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const DriverAnalytics = lazy(() => import("@/pages/DriverRoutes/DriverDashboardComponents/DriverAnalytics"));
const DriverRideHistory = lazy(() => import("@/pages/DriverRoutes/DriverDashboardComponents/DriverRideHistory"));
const UpdateProfile = lazy(() => import("@/pages/PublicRoutes/Auth/UpdateProfile"));






export const driverSidebarItems : ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/driver/analytics",
                component: DriverAnalytics
            }
        ],
    },
    {
        title: "Ride History",
        items: [
            {
                title: "Riding History",
                url: "/driver/ride-history",
                component: DriverRideHistory
            }
        ],
    },
    {
        title: "Manage User Profile",
        items: [
            {
                title: "Update Profile",
                url: "/driver/update-profile",
                component: UpdateProfile
            }
        ],
    }
]