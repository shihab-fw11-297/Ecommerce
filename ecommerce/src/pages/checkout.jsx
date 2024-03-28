import {
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import React, { FormEvent, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/orderAPI";
import { responseToast } from "../utils/features";
import { resetCart } from "../redux/reducer/cartReducer";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isProcessing, setIsProcessing] = useState(false);
    const [newOrder] = useNewOrderMutation();

    const { user } = useSelector((state) => state.userReducer);
    const {
        shippingInfo,
        cartItems,
        subtotal,
        tax,
        discount,
        shippingCharges,
        total,
    } = useSelector((state) => state.cartReducer);


    const submitHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;
        setIsProcessing(true);

        const orderData = {
            shippingInfo,
            orderItems: cartItems,
            subtotal,
            tax,
            discount,
            shippingCharges,
            total,
            user: user?._id,
          };

        const { paymentIntent, error } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: window.location.origin },
            redirect: "if_required",
        });

        if (error) {
            setIsProcessing(false);
            return toast.error(error.message || "Something Went Wrong");
        }

        if (paymentIntent.status === "succeeded") {
            const res = await newOrder(orderData);
            dispatch(resetCart());
            responseToast(res, navigate, "/orders");

        }
        setIsProcessing(false);
    }
    return (
        <div className="checkout-container">
            <form onSubmit={submitHandler}>
                <PaymentElement />
                <button type="submit" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Pay"}
                </button>
            </form>
        </div>
    )
}
const Checkout = () => {
    const location = useLocation();

    const clientSecret = location.state;

    if (!clientSecret) return <Navigate to={"/shipping"} />;

    return (
        <Elements
            options={{
                clientSecret,
            }}
            stripe={stripePromise}
        >
            <CheckOutForm />
        </Elements>
    )
}

export default Checkout