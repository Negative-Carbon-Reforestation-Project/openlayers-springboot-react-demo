import React from "react";
import Logo from "./Logo";

/**
 * Container for custom Footer
 * @param children The child components
 * @returns {JSX.Element}
 */
const Footer = () => {
    return (
        <footer className="footer">
            <section className="footer-top">
                <Logo className="footer-logo"/>
                <article className="footer-links-group">
                    <h2 className="footer-links-header">Useful Links</h2>
                    <ul className="footer-links">
                        <li className="footer-link-item">
                            <a href="/mission">Our Mission</a>
                        </li>
                        <li className="footer-link-item">
                            <a href="/maps">Explore</a>
                        </li>
                        <li className="footer-link-item">
                            <a href="#">Terms of Service</a>
                        </li>
                        <li className="footer-link-item">
                            <a href="#">Privacy Policy</a>
                        </li>
                    </ul>
                </article>

            </section>
            <section className="footer-bottom">
                <p>NCRP {new Date(Date.now()).getUTCFullYear()} &copy; - <strong>Negative Carbon Reforestation Project</strong> - All rights reserved</p>
                <p>Site last updated: April 02, 2022</p>
            </section>
        </footer>
    );
}

export default Footer;