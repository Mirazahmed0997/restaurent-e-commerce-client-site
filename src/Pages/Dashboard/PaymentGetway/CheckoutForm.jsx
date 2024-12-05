import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import UseAxios from '../../../Hooks/useAxios/UseAxios';
import USeCart from '../../../Hooks/UseCart/USeCart';
import UseAuth from '../../../Hooks/Auth/UseAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = UseAxios();
    const [error, setError] = useState()
    const [cart,refetch] = USeCart();
    const [transactionId,setTransactionId]=useState('')
    const [clientSecret,setClientSecret]=useState('')
    const navigate=useNavigate();
    const {user}=UseAuth()
    const price = cart.reduce((sum, item) => sum + item.price, 0)



    useEffect(() => {
       if(price>0)
       {
        axiosSecure.post('create-payment-intent', { price: price })

        .then(res=>
        {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
       }
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

        // confirm payment

        const {paymentIntent,error:confirmError }= await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card:card,
                billing_details:{
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if(confirmError)
        {
            setTransactionId('')
            console.log("confirm error")
        }
        else{
            console.log('payment intent', paymentIntent)
            if(paymentIntent.status==='succeeded')
            {
                console.log(paymentIntent.id)
                setTransactionId(paymentIntent.id)

                const payment={
                    email: user.email,
                    price: price,
                    transactionId:paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item=>item._id),
                    menuItemIds: cart.map(item=>item.cartId),
                    status: 'Pending'
                }

                const res= await axiosSecure.post('payments',payment);
                refetch();
                if(res.data?.paymentHistory?.insertedId)
                {
                    Swal.fire({
                        title: "Good job!",
                        text: "Payment Success",
                        icon: "success"
                      });
                }
                navigate('/dashboard/paymentHistory')
            }
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
            {
                transactionId && <p className='text-green-600'>Your transaction Id : {transactionId}</p>
            }
        </form>
    );
};

export default CheckoutForm;