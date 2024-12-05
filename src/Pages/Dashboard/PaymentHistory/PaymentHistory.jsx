import React from 'react';
import UseAuth from '../../../Hooks/Auth/UseAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxios from '../../../Hooks/useAxios/UseAxios';
import SharedTitle from '../../Home/SharedTitle';

const PaymentHistory = () => {

    const { user } = UseAuth();
    const axiosSecure = UseAxios();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`payments/${user.email}`)
            console.log(res.data)
            return res.data;
        }
    })

    return (
        <div>
            <SharedTitle title='Payments' subTitle='Your'></SharedTitle>
            <p>
                Total Item: {payments.length}
            </p>
            <div className="overflow-x-auto py-6">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Price</th>
                            <th>Transaction ID</th>
                            <th>Status</th>
                            <th>Date</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.slice().reverse().map((payment,index) =>
                                <tr>
                                    <th>{index+1}</th>
                                    <td>{payment.price}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.status}</td>
                                    <td>{(payment.date)}</td>
                               
                                </tr>)
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;