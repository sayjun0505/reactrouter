import React, { useState } from "react";
import FacebookLogin from 'react-facebook-login';
import { Link, useNavigate } from "react-router-dom";
import { BsFacebook } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './style.css';

import config from "../../config";
import InputBox from "../../components/common/inputbox";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const responseFacebook = (response) => {
        console.log(response);
    }
    const componentClicked = () => {
        console.log("clicked");
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleKeypressEnter = (e) => {
        if (e.keyCode === 13) {
            handleLogin();
        }
    }
    const handleLogin = () => {
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
            body: JSON.stringify({ email: email, password: password })
        };
        let requestUrl = `${config.server_url}/api/users/login`;
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
        if (email === '' || password === '') {
            return false;
        } else {
            return true;
        }
    }
    const validateFormData = () => {
        if (email.indexOf('@') < 0 || email.indexOf('.') < 0 || email.trim().indexOf(' ') > 0) {
            return "Enter correct email!";
        }
        return "success";
    }
    return (
        <div className="main-body-container wrapper-center">
            <div className="login-form-wrapper">
                <p className="login-form-title">Log in to Gang Green Heroes</p>
                <FacebookLogin
                    appId="1088597931155576"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook}
                    cssClass="btnFacebook"
                    icon={<BsFacebook />} />
                <div className="sep-line"><span>Or</span></div>
                <InputBox placeholder="E-mail" style={{ fontSize: '18px', width: '60%' }} handleChange={handleEmail} handleKeypress={handleKeypressEnter} value={email} />
                <InputBox type="password" placeholder="Password" style={{ fontSize: '18px', width: '60%', marginTop: '30px' }} handleChange={handlePassword} handleKeypress={handleKeypressEnter} value={password} />
                <p className="forget-password-label">Did you forget your password<font face="Arial">?</font></p>
                <button className="login-button" onClick={() => handleLogin()}>Login</button>
            </div>
            <Link to="/register"><p className="signup-label">Not yet registered<font face="Arial">?</font> Sign up!</p></Link>
            <ToastContainer />
        </div>
    )
}

export default Login;