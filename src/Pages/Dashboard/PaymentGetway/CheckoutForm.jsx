import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import UseAxios from '../../../Hooks/useAxios/UseAxios';
import USeCart from '../../../Hooks/UseCart/USeCart';


const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = UseAxios();
    const [error, setError] = useState()
    const [cart] = USeCart();
    const [clientSecret,setClientSecret]=useState('')
    const price = cart.reduce((sum, item) => sum + item.price, 0)



    useEffect(() => {
        axiosSecure.post('create-payment-intent', { price: price })

        .then(res=>
        {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        }
        )
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError(' ')
        }


    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-sm btn-primary my-4' type="submit" disabled={!stripe || !clientSecret }>
                Pay
            </button>
            <p className='text-red-900'>{error}</p>
        </form>
    );
};

export default CheckoutForm;