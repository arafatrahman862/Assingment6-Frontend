import { baseApi } from "@/redux/baseApi";



export const ridesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFeedbacks: builder.query({
            query: () => ({
                url: "/rides/all-feedbacks",
                method: "GET",
            }),
        }),

        getMyRide: builder.query({
            query: (id) => ({
                url: `/rides/my-ride/${id}`,
                method: "GET",
            }),
            providesTags: ["RIDES"],
        }),

        getAllRidesForRider: builder.query({
            query: (params) => ({
                url: "/rides/all-rides-rider",
                method: "GET",
                params
            }),
            providesTags: ["RIDES"],
        }),
        getLatestRideForRider: builder.query({
            query: (params) => ({
                url: "/rides/rider-latest-ride",
                method: "GET",
                params
            }),
            providesTags: ["RIDES"],
        }),

        getAllRidesForDriver: builder.query({
            query: (params) => ({
                url: "/rides/all-rides-driver",
                method: "GET",
                params
            }),
            providesTags: ["RIDES"],
        }),
        getAllRidesForAdmin: builder.query({
            query: (params) => ({
                url: "/rides/all-rides-admin",
                method: "GET",
                params
            }),
            providesTags: ["RIDES"],
        }),



        driverNearMe: builder.query({
            query: () => ({
                url: "/rides/drivers-near",
                method: "GET",
            }),
            providesTags: ["DRIVER"],
        }),
        requestRide: builder.mutation({
            query: (rideInfo) => ({
                url: "/rides/request",
                method: "POST",
                data: rideInfo,
            }),
            invalidatesTags: ["RIDES"],
        }),
        cancelRide: builder.mutation({
            query: (id) => ({
                url: `/rides/cancel-ride/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDES"],
        }),

        // ______________________________driver_______________________________________
        ridesNearMe: builder.query({
            query: () => ({
                url: "rides/rides-near",
                method: "GET",
            }),
            providesTags: ["RIDES"],
        }),
        acceptRide: builder.mutation({
            query: (id) => ({
                url: `/rides/accept-ride/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDES"],
        }),
        rejectRide: builder.mutation({
            query: (id) => ({
                url: `/rides/reject-ride/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDES"],
        }),
        rideAcceptedByMe: builder.query({
            query: () => ({
                url: `/rides/my-accepted-ride`,
                method: "GET",
            }),
            providesTags: ["RIDES"],
        }),

        singleRideAcceptedByMe: builder.query({
            query: (id) => ({
                url: `/rides/my-accepted-ride/${id}`,
                method: "GET",
            }),
            providesTags: ["RIDES"],
        }),
        singleRideForAdmin: builder.query({
            query: (id) => ({
                url: `/rides/single-ride/${id}`,
                method: "GET",
            }),
            providesTags: ["RIDES"],
        }),
        updateRideLocation: builder.mutation({
            query: ({ id, location }) => ({
                url: `/rides/ride-location-update/${id}`,
                method: "PATCH",
                data: location
            }),
            invalidatesTags: ["RIDES"],
        }),
        pickupRide: builder.mutation({
            query: (rideId) => ({
                url: `/rides/pickup-rider/${rideId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDES"],
        }),
        startRide: builder.mutation({
            query: (rideId) => ({
                url: `/rides/start-ride/${rideId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDES"],
        }),
        markArrived: builder.mutation({
            query: (rideId) => ({
                url: `/rides/arrived-destination/${rideId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDES"],
        }),

        // rider________________________
        registerAsDriver: builder.mutation({
            query: (driverInfo) => ({
                url: "/drivers/register",
                method: "POST",
                data: driverInfo,
            }),
            invalidatesTags: ["DRIVER"],
        }),
        payOnline: builder.mutation({
            query: (rideId) => ({
                url: `/rides/pay-online/${rideId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDES"],
        }),
        payOffline: builder.mutation({
            query: (rideId) => ({
                url: `/rides/pay-offline/${rideId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDES"],
        }),
        giveFeedback: builder.mutation({
            query: ({ rideId, feedback }) => ({
                url: `/rides/feedback/${rideId}`,
                method: "PATCH",
                data: feedback
            }),
            invalidatesTags: ["RIDES"],
        }),

    }),
});

export const {
    useSingleRideForAdminQuery,
    useGetAllRidesForAdminQuery,
    useRegisterAsDriverMutation,
    useGetAllRidesForDriverQuery,
    usePayOfflineMutation,
    useGiveFeedbackMutation,
    usePayOnlineMutation,
    useStartRideMutation,
    useMarkArrivedMutation,
    usePickupRideMutation,
    useUpdateRideLocationMutation,
    useRideAcceptedByMeQuery,
    useAcceptRideMutation,
    useRejectRideMutation,
    useGetAllFeedbacksQuery,
    useRidesNearMeQuery,
    useCancelRideMutation,
    useRequestRideMutation,
    useDriverNearMeQuery,
    useGetMyRideQuery,
    useGetAllRidesForRiderQuery,
    useSingleRideAcceptedByMeQuery,
    useGetLatestRideForRiderQuery
} = ridesApi