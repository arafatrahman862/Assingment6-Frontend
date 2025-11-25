
import type { ISidebarItems } from "@/types";
import { lazy } from "react";
const RideAnalytics = lazy(() => import("@/pages/RiderRoutes/RiderDashboardComponents/RideAnalytics"));
const RiderRideHistory = lazy(() => import("@/pages/RiderRoutes/RiderDashboardComponents/RiderRideHistory"));
const UpdateProfile = lazy(() => import("@/pages/PublicRoutes/Auth/UpdateProfile"));





export const riderSidebarItems : ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/rider/analytics",
                component: RideAnalytics
            }
        ],
    },
    {
        title: "Ride History",
        items: [
            {
                title: "My Ride History",
                url: "/rider/ride-history",
                component: RiderRideHistory
            }
        ],
    },
    {
        title: "Manage Profile",
        items: [
            {
                title: "Update Rider Profile",
                url: "/rider/update-profile",
                component: UpdateProfile
            }
        ],
    },
]