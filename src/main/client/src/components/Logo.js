import React from "react";
import logo from "../resources/images/ncrp-logo.png"
import "./Logo.css"

/**
 * Container for site logo
 * @returns {JSX.Element}
 */
const Logo = () => {
    return <img src={logo} className="app-logo" alt="app-logo"/>
}

export default Logo;