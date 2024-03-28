import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { productAPI } from "./api/productAPI";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderAPI";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [productAPI.reducerPath]:productAPI.reducer,
        [userReducer.name]:userReducer.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [cartReducer.name]:cartReducer.reducer
    },
    middleware: (mid) => [
        ...mid(),
        userAPI.middleware,
        productAPI.middleware,
        orderApi.middleware,
    ]
})