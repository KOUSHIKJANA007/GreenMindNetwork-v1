import { useState } from "react"
import { useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { createUser } from "../store/userDetails";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [users, setUsers] = useState({});

    const setSignupData = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value })
    }

    const handleSubmitSignUpData = (e) => {
        e.preventDefault();
        dispatch(createUser(users))
            .then(unwrapResult)
            .then((obj) => {
                if (obj.id != null) {
                    toast.success("Registration successfull")
                    navigate("/signin");
                }
                else {
                    toast.error(obj.fname)
                    toast.error(obj.lname)
                    toast.error(obj.email)
                    toast.error(obj.password)
                }
            })
            .catch((obj) => console.log({ obj }))


    }
    return (
        <>
            <Form className="signup_container" onSubmit={handleSubmitSignUpData}>
                <h1>register here</h1>
                <div className="signup_input_box_name">
                    <div className='fname_input'>
                        <label htmlFor="fname">first name</label>
                        <input className='signup_input' type="text" name="fname" onChange={setSignupData} id='fname' />
                    </div>
                    <div className='lname_input'>
                        <label htmlFor="lname">last name</label>
                        <input className='signup_input' type="text" name="lname" onChange={setSignupData} id='lname' />
                    </div>

                </div>
                <div className="signup_input_box">
                    <label htmlFor="email">email</label>
                    <input className='signup_input' type="email" name="email" onChange={setSignupData} id='email' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="mobile">mobile</label>
                    <input className='signup_input' type="number" name="mobile" onChange={setSignupData} id='mobile' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="date">DOB</label>
                    <input className='signup_input' type="date" name="dob" onChange={setSignupData} id='date' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="password">Password</label>
                    <input className='signup_input' type="password" name="password" onChange={setSignupData} id='password' />
                </div>
                <div className="signup_input_box_check">
                    <input className='login_input_check' type="checkbox" name="check" id="check" />
                    <label htmlFor="check">Agree trems and conditions</label>
                </div>
                <div className="signup_button">
                    <button type='submit'>Sign UP</button>
                </div>
            </Form>
        </>
    )
}
export default SignUp