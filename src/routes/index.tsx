import App from "@/App";
import Login from "@/pages/PublicRoutes/Auth/Login";
import Register from "@/pages/PublicRoutes/Auth/Register";



import { createBrowserRouter, Navigate } from "react-router";


import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/PublicRoutes/Error/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import { HomePage } from "@/pages/PublicRoutes/Home/HomePage";
import { ErrorPage } from "@/pages/PublicRoutes/Error/ErrorPage";
import Contact from "@/pages/PublicRoutes/Contact/Contact";
import About from "@/pages/PublicRoutes/About/About";
import Features from "@/pages/PublicRoutes/Feature/Features";
import FrequentQuestions from "@/pages/PublicRoutes/FAQ/FrequentQuestions";
import ContactAdmin from "@/pages/PublicRoutes/Contact/ContactAdmin";

import { riderSidebarItems } from "./riderSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";

import { driverSidebarItems } from "./driverSidebarItems";

import { adminSidebarItems } from "./adminSidebarItems";
import { lazy } from "react";


const BookRide = lazy(() => import("@/pages/RiderRoutes/BookRide"));
const MyRide = lazy(() => import("@/pages/RiderRoutes/MyRide"));
const StartDriving = lazy(() => import("@/pages/DriverRoutes/StartDriving"));
const RideDetails = lazy(() => import("@/pages/DriverRoutes/RideDetails"));
const RegisterAsDriver = lazy(() => import("@/pages/RiderRoutes/RegisterAsDriver"));
const MyRideDetails = lazy(() => import("@/pages/RiderRoutes/RiderDashboardComponents/MyRideDetails"));
const DriverRideDetails = lazy(() => import("@/pages/DriverRoutes/DriverDashboardComponents/DriverRideDetails"));
const AdminRideDetails = lazy(() => import("@/pages/AdminRoutes/AdminDashboardComponents/AdminRideDetails"));
const DashboardLayout = lazy(() => import("@/components/layouts/DashboardLayout"));





export const router = createBrowserRouter(
    [
        {
            Component: App,
            errorElement: <ErrorPage />,
            path: "/",
            children: [
                {
                    Component: HomePage,
                    index: true,
                },
                {
                    Component: About,
                    path: "/about",
                },
                {
                    Component: Contact,
                    path: "/contact",
                },
                {
                    Component: Features,
                    path: "/features",
                },
                {
                    Component: FrequentQuestions,
                    path: "/faq",
                },
                {
                    Component: withAuth(BookRide, role.rider as TRole),
                    path: "/book-ride",
                },
                {
                    Component: withAuth(MyRide, role.rider as TRole),
                    path: "/my-ride/:rideId",
                },
                {
                    Component: withAuth(StartDriving, role.driver as TRole),
                    path: "/start-driving",
                },
                {
                    Component: ContactAdmin,
                    path: "/contact-admin",
                },
                {
                    Component: withAuth(RideDetails, role.driver as TRole),
                    path: "/my-accepted-ride/:id",
                },
                {
                    Component: withAuth(RegisterAsDriver, role.rider as TRole),
                    path: "/driver-register",
                },
                {
                    Component: withAuth(MyRideDetails, role.rider as TRole),
                    path: `/my-ride-details/:id`,
                },
                {
                    Component: withAuth(DriverRideDetails, role.driver as TRole),
                    path: `/my-accepted-ride-details/:id`,
                },
                {
                    Component: withAuth(AdminRideDetails, role.admin as TRole),
                    path: `/single-ride-details/:id`,
                },

            ]
        },
        {
            Component: withAuth(DashboardLayout, role.rider as TRole),
            path: "/rider",
            children: [
                { index: true, element: <Navigate to="/rider/analytics" /> },
                ...generateRoutes(riderSidebarItems)
            ]
        },
        {
            Component: withAuth(DashboardLayout, role.driver as TRole),
            path: "/driver",
            children: [
                { index: true, element: <Navigate to="/driver/analytics" /> },
                ...generateRoutes(driverSidebarItems)
            ]
        },
        {
            Component: withAuth(DashboardLayout, role.admin as TRole),
            path: "/admin",
            children: [
                { index: true, element: <Navigate to="/admin/analytics" /> },
                ...generateRoutes(adminSidebarItems)
            ]
        },
        {
            Component: Login,
            path: "login"
        },
        {
            Component: Register,
            path: "register"
        },

        {
            path: "/unauthorized",
            Component: Unauthorized,
        },

    ]
)