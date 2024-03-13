import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { createUser } from "../store/userDetails";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import LoadingBar from "react-top-loading-bar";
import { validationAction } from "../store/OtpValidation";

const SignUp = () => {
    const { useremail, progress } = useSelector((store) => store.validation);
    const { loading } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[agree,setAgree]=useState(false);
    const [users, setUsers] = useState({});

    const setTermandCondition=()=>{
        setAgree(!agree);
    }
    const setSignupData = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value })
    }

    useEffect(()=>{
        document.title="Sign up page"
        setUsers({ ...users, "email": useremail });
    },[])
    const handleSubmitSignUpData = (e) => {
        e.preventDefault();
        dispatch(validationAction.setProgress(50))
        if(!agree){
            toast.error("Please check Terms and conditions");
            return;
        }
        dispatch(createUser(users))
            .then(unwrapResult)
            .then((obj) => {
                if (obj.id != null && obj.id>0) {
                    console.log(obj);
                    toast.success("Registration successfull")
                    navigate("/signin");
                }else if(obj.id<=0){
                    toast.error("Email already exist")
                    navigate("/email-input")
                }
                else {
                    toast.error(obj.fname)
                    toast.error(obj.lname)
                    toast.error(obj.email)
                    toast.error(obj.password)
                }
                dispatch(validationAction.setProgress(100))
            })
            .catch((obj) => {
                console.log({obj});
                // toast.error("Email already exixst");
            })


    }
    return (
        <>
            {loading && <LoadingBar color="#78be20"progress={progress}/>}
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
                    <input disabled className='signup_input' type="email" name="email" value={useremail} id='email' />
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
                    <label htmlFor="youtubeLink">YouTube Link</label>
                    <input className='signup_input' type="text" name="youtubeLink"  onChange={setSignupData} id='youtubeLink' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="instagramLink">Instagram Link</label>
                    <input className='signup_input' type="text" name="instagramLink"  onChange={setSignupData} id='instagramLink' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="twitterLink">Twitter Link</label>
                    <input className='signup_input' type="text" name="twitterLink"  onChange={setSignupData} id='twitterLink' />
                </div>
                <div className="signup_input_box">
                    <label htmlFor="facebookLink">Facebook Link</label>
                    <input className='signup_input' type="text" name="facebookLink"  onChange={setSignupData} id='facebookLink' />
                </div>



                <div className="signup_input_box">
                    <label htmlFor="password">Password</label>
                    <input className='signup_input' type="password" name="password" onChange={setSignupData} id='password' />
                </div>
                <div className="signup_input_box_check">
                    <input onClick={setTermandCondition} className='login_input_check' type="checkbox" name="check" id="check" />
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