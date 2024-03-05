import React from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPayment, updatePayment } from '../store/donationDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const Donation = () => {
    document.title="Donate"
    const { users } = useSelector((store) => store.user);
    const amountInput = useRef();
    const dispatch = useDispatch()
    const handlePay = () => {
        const amountToPay = amountInput.current.value;
        if (amountToPay.trim() == "") {
            toast.error("Please enter amount to procced")
            return;
        }
        if (isNaN(amountToPay)) {
            toast.error("Please enter valid amount to procced")
            return;
        }
        dispatch(createPayment({ amountToPay: amountToPay, userId: users?.id }))
            .then(unwrapResult)
            .then((res) => {
                if (res.status == 'created') {
                    let options = {
                        key: "rzp_test_k0FnFuJJ5UXZ3l",
                        amount: res.amount,
                        currency: "INR",
                        name: "Green Mind Network Donation",
                        image: "http://localhost:5173/userhome",
                        order_id: res.id,
                        handler: function (res) {
                            console.log(res.razorpay_payment_id);
                            console.log(res.razorpay_order_id);
                            console.log(res.razorpay_signature);

                            dispatch(updatePayment({ paymentId: res.razorpay_payment_id, orderId: res.razorpay_order_id, status: "paid" }))
                                .then(unwrapResult)
                                .then((res) => {
                                    toast.success("payment successfull")
                                })
                        },
                        prefill: {
                            name: "Koushik Jana",
                            email: "koushikj389@gmail.com",
                            contact: "+91 7891085911"
                        },
                        notes: {
                            address: "Green Mind Network"
                        },
                        theme: {
                            color: "#3399cc"
                        },
                    };
                    var rzp1 = new Razorpay(options);
                    rzp1.on('payment.failed', function (response) {
                        console.log(response.error.code);
                        console.log(response.error.description);
                        console.log(response.error.source);
                        console.log(response.error.step);
                        console.log(response.error.reason);
                        console.log(response.error.metadata.order_id);
                        console.log(response.error.metadata.payment_id);
                        alert("payment failed")
                    });
                    amountInput.current.value = "";
                    rzp1.open()
                }
            })

    }
    return (
        <div className='amount_input'>
            <input ref={amountInput} type="text" />
            <button type='submit' onClick={handlePay}>pay</button>
        </div>
    )
}

export default Donation