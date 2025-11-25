
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const AdminAnalytics = lazy(() => import("@/pages/AdminRoutes/AdminDashboardComponents/AdminAnalytics"));
const AdminRideHistory = lazy(() => import("@/pages/AdminRoutes/AdminDashboardComponents/AdminRideHistory"));
const ManageDrivers = lazy(() => import("@/pages/AdminRoutes/AdminDashboardComponents/ManageDrivers"));
const ManageFeedBacks = lazy(() => import("@/pages/AdminRoutes/AdminDashboardComponents/ManageFeedBacks"));
const ManageUsers = lazy(() => import("@/pages/AdminRoutes/AdminDashboardComponents/ManageUsers"));
const UpdateProfile = lazy(() => import("@/pages/PublicRoutes/Auth/UpdateProfile"));






export const adminSidebarItems : ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: AdminAnalytics
            }
        ],
    },
    {
        title: "Ride History",
        items: [
            {
                title: "All Rides",
                url: "/admin/ride-history",
                component: AdminRideHistory
            }
        ],
    },
    {
        title: "User Management",
        items: [
            {
                title: "Manage Users",
                url: "/admin/manage-users",
                component: ManageUsers
            },
            {
                title: "Manage Drivers",
                url: "/admin/manage-drivers",
                component: ManageDrivers
            },
            {
                title: "Manage Feedbacks",
                url: "/admin/manage-feedbacks",
                component: ManageFeedBacks
            }
        ],
    },
    {
        title: "Manage Admin Profile",
        items: [
            {
                title: "Update Profile",
                url: "/admin/update-profile",
                component: UpdateProfile
            }
        ],
    },
]