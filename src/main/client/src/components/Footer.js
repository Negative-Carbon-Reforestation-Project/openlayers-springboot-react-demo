import React from "react";
import "../styles/Footer.css";

/**
 * Container for custom Footer
 * @param children The child components
 * @returns {JSX.Element}
 */
const Footer = ({ children }) => {
    return <footer>{children}</footer>
}

export default Footer;