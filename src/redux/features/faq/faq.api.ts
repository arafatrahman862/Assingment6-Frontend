import { baseApi } from "@/redux/baseApi";



export const faqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        askQuestion: builder.mutation({
            query: (faqInfo) => ({
                url: "/faq/ask-question",
                method: "POST",
                data: faqInfo,
            }),
            invalidatesTags: ["FAQ"],
        }),
        replyQuestion: builder.mutation({
            query: ({id,payload}) => ({
                url: `/faq/reply-question/${id}`,
                method: "PATCH",
                data: payload,
            }),
            invalidatesTags: ["FAQ"],
        }),
        getAllQuestions: builder.query({
            query: (params) => ({
                url: "/faq",
                method: "GET",
                params,
            }),
            providesTags: ["FAQ"],
        }),
    }),
});

export const {
    useAskQuestionMutation,
    useGetAllQuestionsQuery,
    useReplyQuestionMutation
} = faqApi