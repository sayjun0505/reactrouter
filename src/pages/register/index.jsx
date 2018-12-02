import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css';

import FacebookLogin from 'react-facebook-login';
import { BsFacebook } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputBox from "../../components/common/inputbox";
import config from "../../config";

const Register = () => {
    const [registerMethod, setRegisterMethod] = useState('citizen');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyWebsite, setCompanyWebsite] = useState('');
    const navigate = useNavigate();
    const responseFacebook = (response) => {
        console.log(response);
    }
    const componentClicked = () => {
        console.log("clicked");
    }
    const handleRadio = (e) => {
        setRegisterMethod(e);
    }
    const handleFullname = (e) => {
        setFullname(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleCompanyName = (e) => {
        setCompanyName(e.target.value);
    }
    const handleCompanyWebsite = (e) => {
        setCompanyWebsite(e.target.value);
    }
    const handleKeypressEnter = (e) => {
        if (e.keyCode === 13) {
            handleRegister();
        }
    }
    const handleRegister = () => {
        if (!validateForm()) {
            toast.error("Input the fields!");
            return;
        }
        if (validateFormData() !== "success") {
            toast.error(validateFormData());
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ companyName: companyName, fullname: fullname, companyWebsite: companyWebsite, email: email, password: password, registerMethod: registerMethod })
        };
        let requestUrl = `${config.server_url}/api/users/register`;
        fetch(requestUrl, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.token) {
                        localStorage.setItem("token", JSON.stringify(result.token));
                        localStorage.setItem("notify", result.msg);
                        navigate("/");
                    } else {
                        toast.error(result.msg);
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    const validateForm = () => {
        if (registerMethod === 'citizen') {
            if (fullname === '' || email === '' || password === '') {
                return false;
            } else {
                return true;
            }
        } else {
            if (companyName === '' || email === '' || fullname === '' || companyWebsite === '' || password === '') {
                return false;
            } else {
                return true;
            }
        }
    }
    const validateFormData = () => {
        if (email.indexOf('@') < 0 || email.indexOf('.') < 0 || email.trim().indexOf(' ') > 0) {
            return "Enter correct email!";
        }
        if (fullname.trim().indexOf(' ') < 0) {
            return "Enter your full name!";
        }
        if (registerMethod === 'company' && companyWebsite.indexOf('http://') < 0 && companyWebsite.indexOf('https://') < 0) {
            return "Website url must include http:// or https://";
        }
        return "success";
    }
    return (
        <div className="main-body-container wrapper-center">
            <div className="main-body-container wrapper-center">
                <div className="register-form-wrapper">
                    <p className="register-form-title">Join Gang Green Heroes</p>
                    <FacebookLogin
                        appId="1088597931155576"
                        autoLoad={true}
                        fields="name,email,picture"
                        onClick={componentClicked}
                        callback={responseFacebook}
                        cssClass="btnFacebook"
                        icon={<BsFacebook />} />
                    <div className="sep-line"><span>Or</span></div>
                    <div className="register-method-section">
                        <label className="radio-container">Register as a Citizen
                            <input type="radio" name="register-method" checked={registerMethod === 'citizen' ? true : false} onChange={() => handleRadio('citizen')} />
                            <span className="checkmark"></span>
                        </label>
                        <label className="radio-container">Register as a Company
                            <input type="radio" name="register-method" checked={registerMethod === 'company' ? true : false} onChange={() => handleRadio('company')} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className={`register-form-item ${(registerMethod === 'citizen') && 'active'}`}>
                        <InputBox placeholder="First and Last name" style={{ fontSize: '18px', width: '60%' }} handleChange={handleFullname} handleKeypress={handleKeypressEnter} value={fullname} />
                        <InputBox placeholder="E-mail" style={{ fontSize: '18px', width: '60%', marginTop: '20px' }} handleChange={handleEmail} handleKeypress={handleKeypressEnter} value={email} />
                        <InputBox type="password" placeholder="Password" style={{ fontSize: '18px', width: '60%', marginTop: '20px' }} handleChange={handlePassword} handleKeypress={handleKeypressEnter} value={password} />
                    </div>
                    <div className={`register-form-item ${(registerMethod === 'company') && 'active'}`}>
                        <InputBox placeholder="Company name" style={{ fontSize: '18px', width: '60%' }} handleChange={handleCompanyName} handleKeypress={handleKeypressEnter} value={companyName} />
                        <InputBox placeholder="E-mail" style={{ fontSize: '18px', width: '60%', marginTop: '20px' }} handleChange={handleEmail} handleKeypress={handleKeypressEnter} value={email} />
                        <InputBox placeholder="Your full name" style={{ fontSize: '18px', width: '60%', marginTop: '20px' }} handleChange={handleFullname} handleKeypress={handleKeypressEnter} value={fullname} />
                        <InputBox placeholder="Company website (optional)" style={{ fontSize: '18px', width: '60%', marginTop: '20px' }} handleChange={handleCompanyWebsite} handleKeypress={handleKeypressEnter} value={companyWebsite} />
                        <InputBox type="password" placeholder="Password" style={{ fontSize: '18px', width: '60%', marginTop: '20px' }} handleChange={handlePassword} handleKeypress={handleKeypressEnter} value={password} />
                    </div>
                    <button className="register-button" onClick={() => handleRegister()}>Come in</button>
                    <p className="policy-label">Creating an account means you accept our<br /> <Link>Terms of Use</Link> and our <Link>Privacy Policy</Link></p>
                </div>
                <Link to="/login"><p className="register-label">Already User<font face="Arial">?</font> Login!</p></Link>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register;