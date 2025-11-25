import { baseApi } from "@/redux/baseApi";



export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userUpdate: builder.mutation({
            query: ({id, userData}) => ({
                url: `/users/${id}`,
                method: "PATCH",
                data : userData
            }),
            invalidatesTags: ["USER"],
        }),

    }),
});

export const {
    useUserUpdateMutation
} = userApi