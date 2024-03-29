import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    cartItems: [],
    subtotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    },
};

export const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.loading = true;

            const index = state.cartItems.findIndex(
                (i) => i.prodId === action.payload.prodId
            );

            if (index !== -1) state.cartItems[index] = action.payload;
            else state.cartItems.push(action.payload);
            state.loading = false;
        },
        removeCartItem: (state, action) => {
            state.loading = true;
            console.log(state.cartItems, action.payload)
            state.cartItems = state.cartItems.filter(
                (i) => i.prodId !== action.payload
            );
            state.loading = false;
        },
        calculatePrice: (state) => {
            console.log("state.cartItems, action.payload",state.cartItems)

            const subtotal = state.cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            state.subtotal = subtotal;
            state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
            state.tax = Math.round(state.subtotal * 0.18);
            state.total =
                state.subtotal + state.tax + state.shippingCharges - state.discount;
        },
        discountApplied: (state, action) => {
            state.discount = action.payload;
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
        },
        resetCart: () => initialState,
        setCart: (state, action) => {
            state.loading = true;
            console.log(state.cartItems, action.payload)
            state.cartItems = action.payload;
            state.loading = false;
        },
    }
});


export const {
    addToCart,
    removeCartItem,
    calculatePrice,
    discountApplied,
    saveShippingInfo,
    resetCart,
    setCart
} = cartReducer.actions;