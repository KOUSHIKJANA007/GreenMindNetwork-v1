import JoditEditor from 'jodit-react'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import { createNgo, ngoAction, uploadIdentityProof, uploadNgoLogo, uploadRegistrationProof, uploadTaxProof } from '../store/ngoDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';
import { validationAction } from '../store/OtpValidation';

const RegisterNgo = () => {
    document.title="Register NGO"
    const editor = useRef(null);
    const navigate=useNavigate();
    const { users } = useSelector((store) => store.user);
    const { loading, isFetch } = useSelector((store) => store.ngo);
    const { progress } = useSelector((store) => store.validation);
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [ngoData, setNgoData] = useState('');
    const [logo, setLogo] = useState('');
    const [identityOfHead, setIdentityOfHead] = useState('');
    const [imageOfTax, setImageOfTax] = useState('');
    const [registerImage, setRegisterImage] = useState('');
    
    const handleOnChange = (e) => {
        setNgoData({ ...ngoData, [e.target.name]: e.target.value });
        console.log(ngoData);
    }
    const handleDescData = (data) => {
        setNgoData({ ...ngoData, 'description': data });
    }
    const handleOnChangeLogo = (e) => {
        setLogo(e.target.files[0]);
    }
    const handleOnChangeTax = (e) => {
        setImageOfTax(e.target.files[0]);
    }
    const handleOnChangeIdentity = (e) => {
        setIdentityOfHead(e.target.files[0]);
    }
    const handleOnChangeRegistration = (e) => {
        setRegisterImage(e.target.files[0]);
    }
    const handleSubmitNgoData = (e) => {
        e.preventDefault();
       
        if(document.getElementById("name")?.value?.trim()==''){
            toast.error("NGO's name should not be null");
            return;
        }
        if(document.getElementById("email")?.value.trim()==''){
            toast.error("NGO's email should not be null");
            return;
        }
        if(document.getElementById("mobile")?.value?.trim()==''){
            toast.error("NGO's mobile should not be null");
            return;
        }
        if (document.getElementById("establishedDate")?.value?.trim()==''){
            toast.error("NGO's foundation date should not be null");
            return;
        }
        if(document.getElementById("slogan")?.value?.trim()==''){
            toast.error("NGO's slogan should not be null");
            return;
        }
        if (document.getElementById("description")?.value?.trim()==''){
            toast.error("NGO's description should not be null");
            return;
        }
        dispatch(validationAction.setProgress(50));
        dispatch(createNgo({ ngoData: ngoData, userId: users.id }))
            .then(unwrapResult)
            .then((data) => {
                if (data?.id) {
                    dispatch(uploadNgoLogo({ logo: logo, ngoId: data?.id }))
                        .then((obj) => {
                          console.log("logo",{obj});
                            if (obj.payload == undefined) {
                                toast.error("Logo is not uploaded");
                                return;
                            }
                            dispatch(uploadIdentityProof({ identityOfHead: identityOfHead, ngoId: data?.id }))
                                .then((obj) => {
                                    dispatch(validationAction.setProgress(70))
                                    if (obj.payload == undefined) {
                                        toast.error("pan is not uploaded");
                                        return;
                                    }
                                    dispatch(uploadTaxProof({ imageOfTax: imageOfTax, ngoId: data?.id }))
                                        .then((obj) => {

                                            if (obj.payload == undefined) {
                                                toast.error("Tax is not uploaded");
                                                return;
                                            }
                                            dispatch(uploadRegistrationProof({ registerImage: registerImage, ngoId: data?.id }))
                                                .then((obj) => {

                                                    if (obj.payload == undefined) {
                                                        toast.error("reg is not uploaded");
                                                        return;
                                                    }

                                                    dispatch(ngoAction.setFetchDone());
                                                    toast.success("NGO saved successfully");
                                                    navigate("/ngo");
                                                })
                                        })
                                })
                        })
                   
                    
                   
                }
                else{
                   toast.error(data.description);
                   toast.error(data.name);
                   toast.error(data.slogan);
                   toast.error(data.address);
                   toast.error(data.mobile);
                }
                dispatch(validationAction.setProgress(100))  
            })
            .catch((err)=>{
                toast.error("Hello",err)
            })

        
    }
    return (
        <>
            {loading && <LoadingBar progress={progress} color="#78be20" />}
            <div className="reg_ngo_container_body">
                <Form onSubmit={handleSubmitNgoData} className="reg_ngo_container">
                    <div className="logo_website">
                        <img src="image/logo.png" alt="" />
                    </div>
                    <div className="reg_ngo_heading">
                        <h1>Register Your NGO</h1>
                    </div>
                    <div className="reg_ngo_input_box">
                        <label htmlFor="name">Enter NGO name</label>
                        <input type="text" className='reg_ngo_input' id='name' onChange={handleOnChange} name='name' />
                    </div>
                    <div className="reg_ngo_input_box">
                        <label htmlFor="email">Enter NGO official email</label>
                        <input type="email" className='reg_ngo_input' id='email' onChange={handleOnChange} name='email' />
                    </div>
                    <div className="reg_ngo_input_box">
                        <label htmlFor="mobile">Enter NGO official mobile</label>
                        <input type="number" className='reg_ngo_input' id='mobile' onChange={handleOnChange} name='mobile' />
                    </div>
                    <div className="reg_ngo_input_box">
                        <label htmlFor="address">Enter NGO official address</label>
                        <input type="text" className='reg_ngo_input' id='address' onChange={handleOnChange} name='address' />
                    </div>
                    <div className="reg_ngo_input_box">
                        <label htmlFor="slogan">Enter NGO's slogan</label>
                        <input type="text" className='reg_ngo_input' id='slogan' onChange={handleOnChange} name='slogan' />
                    </div>
                    <div className="reg_ngo_input_box">
                        <label htmlFor="establishedDate">Enter NGO's Foundation Date</label>
                        <input type="date" className='reg_ngo_input' id='establishedDate' onChange={handleOnChange} name='establishedDate' />
                    </div>
                    <div className="reg_ngo_input_box_image">
                        <label htmlFor="logo">Upload NGO's Logo</label>
                        <input type="file" id='logo' name='logo' onChange={handleOnChangeLogo} required />
                    </div>
                    <div className="reg_ngo_input_box_image">
                        <label htmlFor="identityOfHead">Upload NGO's Head Identity proof(adhar or pan card)</label>
                        <input type="file" id='identityOfHead' name='identityOfHead' onChange={handleOnChangeIdentity} required />
                    </div>
                    <div className="reg_ngo_input_box_image">
                        <label htmlFor="imageOfTax">Upload NGO's Tax proof(water bill or electric bill of physical office)</label>
                        <input type="file" id='imageOfTax' name='imageOfTax' onChange={handleOnChangeTax} required />
                    </div>
                    <div className="reg_ngo_input_box_image">
                        <label htmlFor="registerImage">Upload NGO's registration proof</label>
                        <input type="file" id='registerImage' name='registerImage' onChange={handleOnChangeRegistration} required />
                    </div>
                    <div className="reg_ngo_input_box">
                        <label htmlFor="description">Enter NGO's brife description</label>
                        <JoditEditor
                            editor={editor}
                            value={description}
                            onChange={handleDescData}
                        />
                    </div>
                    <div className="reg_ngo_input_box_check">
                        <input className='reg_ngo_input_check' type="checkbox" name="check" id="check" />
                        <label htmlFor="check">Agree trems and conditions</label>
                    </div>
                    <div className="reg_ngo_button">
                        <button type='submit'>Register</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default RegisterNgo