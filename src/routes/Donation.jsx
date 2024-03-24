import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPayment, updatePayment } from '../store/donationDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Donation = () => {
    document.title = "Donate"
    const navigate=useNavigate();
    const { users } = useSelector((store) => store.user);
    const amountInput = useRef();
    const { ngoId, eventId } = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        window.scroll(0,0);
    },[])
    const handleAmount = (data) => {
        document.getElementById('amount').value = data
    }
    const handlePay = () => {

        const amountToPay = amountInput.current.value;
        console.log("amount", amountToPay);
        if (amountToPay.trim() == "") {
            toast.error("Please enter amount to procced")
            return;
        }
        if (isNaN(amountToPay)) {
            toast.error("Please enter valid amount to procced")
            return;
        }
        console.log("ngoId", ngoId);
        dispatch(createPayment({ amountToPay: amountToPay, userId: users?.id, ngoId: ngoId }))
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

                            dispatch(updatePayment({ paymentId: res.razorpay_payment_id, orderId: res.razorpay_order_id, status: "paid", amount: res.amount, eventId: eventId }))
                                .then(unwrapResult)
                                .then((res) => {
                                    toast.success("payment successfull");
                                    navigate("/donation-dashboard")
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
                        toast.error("Payment fail");
                    });
                    amountInput.current.value = "";
                    rzp1.open()
                }
            })

    }
    return (
        <>
            <div className="donation_container">
                <div className="donation_page_content">
                    <h1> Join Us in Building a Better World Through Giving</h1>
                    <p>Join us in making a meaningful impact! Our NGO is dedicated to empowering communities, providing essential resources, and creating sustainable change. Your donation will directly support our projects aimed at improving education, healthcare, and livelihoods for those in need. Every contribution, no matter the size, plays a crucial role in transforming lives and building a brighter future. Together, we can make a difference that lasts a lifetime. Join our cause today and help us bring hope and opportunity to those who need it most.</p>
                </div>
                <div className="donation_input_container">
                    <h1>Donate today!</h1>
                    <div className='donation_amount_input'>
                        <label htmlFor="amount">Enter amount for donate</label>
                        <input ref={amountInput} type="text" name='amount' id='amount' />
                    </div>
                    <div className="donation_amount_button">
                        <button onClick={() => { handleAmount(500) }}>&#8377;500</button>
                        <button onClick={() => { handleAmount(1000) }}>&#8377;1000</button>
                        <button onClick={() => { handleAmount(2000) }}>&#8377;2000</button>
                        <button onClick={() => { handleAmount(3000) }}>&#8377;3000</button>
                        <button onClick={() => { handleAmount(5000) }}>&#8377;5000</button>
                        <button onClick={() => { handleAmount(10000) }}>&#8377;10000</button>
                    </div>
                    <div className="donation_input_button">
                        <button type='submit' onClick={handlePay}><Link>Pay</Link></button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Donation