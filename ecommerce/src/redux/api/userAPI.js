import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";


export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
    }),
    tagTypes: ["users"],
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (user) => ({
          url: "new",
          method: "POST",
          body: user,
        }),
        invalidatesTags: ["users"],
      }),
    }),
});  

export const {useLoginMutation} = userAPI;