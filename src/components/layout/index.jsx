import React from "react";
import { Outlet } from "react-router-dom";
import './style.css';

import Header from "./header";
import Footer from "./footer";

const Layout = () => {
    return (
        <div className="root-container">
            <Header />
            <div className="layout-container">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout;