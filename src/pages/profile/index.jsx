import React, { useState } from "react";
import { FaMale, FaFemale } from 'react-icons/fa';
import { BsPlusLg, BsTrash } from 'react-icons/bs';
import './style.css';

import InputBox from '../../components/common/inputbox';

const Profile = () => {
    const [registerMethod, setRegisterMethod] = useState('citizen');
    const [gender, setGender] = useState('male');
    const [countWalletAddress, setCountWalletAddress] = useState(0);
    const inputboxStyle = {
        borderRadius: '50rem',
        width: '100%',
        backgroundColor: '#575757',
        border: 'none',
        paddingLeft: '20px',
        fontSize: '16px'
    }
    const handleRadio = (e) => {
        setRegisterMethod(e);
    }
    const handleGender = (e) => {
        setGender(e);
    }
    const handlePlusWalletAddress = () => {
        setCountWalletAddress(countWalletAddress + 1);
    }
    const handleMinusWalletAddress = () => {
        if (countWalletAddress > 0) {
            setCountWalletAddress(countWalletAddress - 1);
        }
    }
    return (
        <div className="main-body-container">
            <div className="profile-container">
                <div className="profile-header-container text-white ">
                    My profile
                </div>
                <div className="profile-body-container">
                    <div className="profile-item-category profile-item-row">
                        <div className="profile-item-label  text-white">
                            Cagetory
                        </div>
                        <div className="profile-item-content category-method-container">
                            <label className="radio-container text-white">Register as a Citizen
                                <input type="radio" name="register-method" checked={registerMethod === 'citizen' ? true : false} onChange={() => handleRadio('citizen')} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="radio-container text-white">Register as a Company
                                <input type="radio" name="register-method" checked={registerMethod === 'company' ? true : false} onChange={() => handleRadio('company')} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <div className="profile-item-row">
                        <div className="profile-item-label text-white">
                            Email Address
                        </div>
                        <div className="profile-item-content">
                            <InputBox style={inputboxStyle} placeholder="E-mail" />
                        </div>
                    </div>
                    <div className="profile-item-row text-white">
                        <div className="profile-item-label">
                            Gender
                        </div>
                        <div className=" text-white profile-item-content gender-row-container">
                            <div className={`gendder-item-container ${gender === 'male' ? 'active' : ''}`} onClick={() => handleGender('male')}>
                                <FaMale />
                                Male
                            </div>
                            <div className={`gendder-item-container ${gender === 'female' ? 'active' : ''}`} onClick={() => handleGender('female')}>
                                <FaFemale />
                                Female
                            </div>
                        </div>
                    </div>
                    <div className="profile-item-row">
                        <div className="profile-item-label  text-white">
                            Full Name
                        </div>
                        <div className="profile-item-content">
                            <InputBox style={inputboxStyle} placeholder="Full name" />
                        </div>
                    </div>
                    <div className={`company-section ${registerMethod === 'company' ? 'active' : ''}`}>
                        <div className="profile-item-row">
                            <div className="profile-item-label text-white">
                                Company Name
                            </div>
                            <div className="profile-item-content">
                                <InputBox style={inputboxStyle} placeholder="Company name" />
                            </div>
                        </div>
                        <div className="profile-item-row">
                            <div className="profile-item-label text-white">
                                Company Website
                            </div>
                            <div className="profile-item-content">
                                <InputBox style={inputboxStyle} placeholder="Company website" />
                            </div>
                        </div>
                    </div>
                    <div className="profile-item-row wrapper-just-content-center">
                        <button className="common-button  text-white wrapper-align-center" onClick={() => handlePlusWalletAddress()}>Add Wallet Address <BsPlusLg /></button>
                        <button className="common-button  text-white wrapper-align-center" onClick={() => handleMinusWalletAddress()}>Remove Wallet Address <BsTrash /></button>
                    </div>
                    {
                        Array.from(Array(countWalletAddress), (e, i) => {
                            return (
                                <div className="profile-item-row" key={i}>
                                    <div className="profile-item-label text-white">
                                        Wallet Address {i + 1}
                                    </div>
                                    <div className="profile-item-content">
                                        <InputBox style={inputboxStyle} placeholder={`Wallet Address ${i + 1}`} />
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="profile-button-wrapper">
                        <button className="common-button text-white">save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;