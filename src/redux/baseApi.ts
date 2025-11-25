import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),

  tagTypes: ["RIDER","DRIVER","RIDE", "FAQ", "RIDES", "STATS","USER","USERS","DRIVERS"],
  endpoints: () => ({}),
});