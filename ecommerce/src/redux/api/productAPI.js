import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";


export const productAPI = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
    }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
        latestProducts: builder.query({
            query: ({ page,limit }) => {
                let base = `latest?page=${page}&limit=${limit}`;
                return base;
            },
            providesTags: ["product"],
        }),
        bestProducts: builder.query({
            query: ({ page,limit }) => {
                let base = `bestProducts?page=${page}&limit=${limit}`;
                return base;
            },
            providesTags: ["product"],
        }),
        categories: builder.query({
            query: () => `categories`,
            providesTags: ["product"],
        }),
        searchProducts: builder.query({
            query: ({ price, search, sort, category, page,limit }) => {
                let base = `all?search=${search}&page=${page}&limit=${limit}`;
        
                if (price) base += `&price=${price}`;
                if (sort) base += `&sort=${sort}`;
                if (category) base += `&category=${category}`;
        
                return base;
              },
              providesTags: ["product"]
        })

    }),
});

export const {
    useLatestProductsQuery,
    useCategoriesQuery,
    useBestProductsQuery,
    useSearchProductsQuery
} = productAPI;