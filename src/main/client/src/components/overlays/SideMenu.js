import React from "react";
import exitIcon from "../../resources/images/icons/exit-icon-50x50.png";

/**
 * Container for the SideMenu
 * @param ref The reference to the side menu
 * @returns {JSX.Element}
 */
import Logo from "../base/Logo";

const SideMenu = React.forwardRef((props, ref) => {

    /**
     * Hides the side menu
     */
    const hideSideMenu = () => {
        ref.current.classList.toggle("active-flex");
    }

    return (
        <>
            <aside ref={ref} className="side-menu topo-skin">
                <section className="side-menu-header">
                    <Logo className="side-menu-logo"/>
                    <button className="side-menu-exit" onClick={() => hideSideMenu()}>
                        <img src={exitIcon} alt="Exit side menu"/>
                    </button>
                </section>

                <section className="side-menu-section">
                    <ul className="side-menu-options">
                        <li>Get Help</li>
                        <li>Share Map</li>
                        <li>Print Map</li>
                        <li>Search Settings</li>
                    </ul>
                </section>

                <section className="side-menu-section">
                    <ul className="side-menu-options">
                        <li>Accessibility</li>
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                        <li>Report An Issue</li>
                    </ul>
                </section>

                <footer className="side-menu-footer">
                    <p><abbr>NCRP</abbr> <time>2022</time> &copy; - Negative Carbon Reforestation Project - All Rights Reserved</p>
                </footer>
            </aside>
        </>
    );
})

export default SideMenu;