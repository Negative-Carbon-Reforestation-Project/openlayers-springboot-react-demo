import React from "react";
import Logo from "./Logo";

/**
 * Container for custom Footer
 * @param children The child components
 * @returns {JSX.Element}
 */
const Footer = () => {
    return (
        <footer className="footer" tabIndex={0} aria-label="Site footer">
            <section className="footer-top">
                <Logo className="footer-logo" tabIndex={0}/>
                <nav className="footer-links-group" aria-label="Site footer navigation" tabIndex={0}>
                    <h2 className="footer-links-header">Useful Links</h2>
                    <ul className="footer-links">
                        <li className="footer-link-item">
                            <a href="/mission">Our Mission</a>
                        </li>
                        <li className="footer-link-item">
                            <a href="/maps">Explore</a>
                        </li>
                        <li className="footer-link-item">
                            <a href="/terms">Terms of Service</a>
                        </li>
                        <li className="footer-link-item">
                            <a href="/privacy">Privacy Policy</a>
                        </li>
                        <li className="footer-link-item">
                            <a href="/accessibility">Accessibility</a>
                        </li>
                    </ul>
                </nav>

            </section>
            <section className="footer-bottom" tabIndex={0} aria-label="Site copyright information">
                <p tabIndex={0}>
                    <abbr title="Negative Carbon Reforestation Project">NCRP</abbr> &nbsp;
                    <time>{new Date(Date.now()).getUTCFullYear()}</time> &copy; -&nbsp;
                    <strong>Negative Carbon Reforestation Project</strong> - All rights reserved
                </p>
                <p tabIndex={0}>Site last updated: <time dateTime="2022-04-10">April 10, 2022</time></p>
            </section>
        </footer>
    );
}

export default Footer;