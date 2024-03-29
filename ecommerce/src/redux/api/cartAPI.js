import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/cart/`,
    }),
    tagTypes: ["cart"],
    endpoints: (builder) => ({
        addToCarts: builder.mutation({
            query: (cart) => ({
                url: "add",
                method: "POST",
                body: cart,
            }),
            invalidatesTags: ["cart"],
        }),
        updatecart: builder.mutation({
            query: ({ data, cartId }) => ({
                url: `${cartId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["cart"],
        }),
        deleteCart: builder.mutation({
            query: ({id}) => ({
                url: id,
                method: "DELETE",
            }),
            invalidatesTags: ["cart"],
        }),
        getCart: builder.query({
            query: (id) => `my/${id}`,
            providesTags: ["cart"],
        }),
    }),
});


export const {
  useAddToCartsMutation,
  useUpdatecartMutation,
  useDeleteCartMutation,
  useGetCartQuery
} = cartApi;