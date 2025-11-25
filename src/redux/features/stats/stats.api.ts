import { baseApi } from "@/redux/baseApi";



export const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRiderReport: builder.query({
            query: (params) => ({
                url: "/stats/my-all-ride-history",
                method: "GET",
                params,
            }),
            providesTags: ["STATS"],
        }),
        getDriverReport: builder.query({
            query: (params) => ({
                url: "/stats/my-earning-history",
                method: "GET",
                params,
            }),
            providesTags: ["STATS"],
        }),
        getAdminReport: builder.query({
            query: (params) => ({
                url: "/stats/earning-history",
                method: "GET",
                params,
            }),
            providesTags: ["STATS"],
        }),
    }),
});

export const {
    useGetRiderReportQuery,
    useGetAdminReportQuery,
    useGetDriverReportQuery
}=statsApi