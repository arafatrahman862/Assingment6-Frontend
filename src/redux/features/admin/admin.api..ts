import { baseApi } from "@/redux/baseApi";



export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: (params) => ({
                url: "/users/all-users",
                method: "GET",
                params
            }),
            providesTags: ["USERS"],
        }),
        changeUserStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/users/change-status/${id}`,
                method: "PATCH",
                data: status,
            }),
            invalidatesTags: ["USERS"],
        }),
        changeDriverStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/drivers/status/${id}`,
                method: "PATCH",
                data: status,
            }),
            invalidatesTags: ["DRIVERS"],
        }),
        getAllDrivers: builder.query({
            query: (params) => ({
                url: "/drivers/all-drivers",
                method: "GET",
                params
            }),
            providesTags: ["DRIVERS"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useChangeUserStatusMutation,
    useGetAllDriversQuery,
    useChangeDriverStatusMutation
} = adminApi;