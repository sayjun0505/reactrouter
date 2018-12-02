import React, { useEffect } from "react";
import './style.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    useEffect(() => {
        if (localStorage.getItem("token") && localStorage.getItem("notify")) {
            toast.success(localStorage.getItem("notify"));
            localStorage.removeItem("notify");
        }
    }, []);
    return (
        <div className="main-body-container">
            Here is Home page.<br />
            Here is Home page.<br />
            Here is Home page.<br />
            Here is Home page.<br />
       
            <ToastContainer />
        </div>
    )
}

export default Home;