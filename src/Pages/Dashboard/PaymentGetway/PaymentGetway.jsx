import React from 'react';
import SharedTitle from '../../Home/SharedTitle';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkoutForm';
import { Elements } from '@stripe/react-stripe-js';



const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLISHABLE_KEY);


const PaymentGetway = () => {
    return (
        <div>
            <SharedTitle title='payment' subTitle='Pay Your Best Price'></SharedTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default PaymentGetway;