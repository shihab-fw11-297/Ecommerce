import {
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [isProcessing, setIsProcessing] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
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
    const clientSecret = "pi_3OyrIYSHlL1stz2L05iiBRxP_secret_spr4Fl94wZqGwtmd5L7V7NpZL";

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