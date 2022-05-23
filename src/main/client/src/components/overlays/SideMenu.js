import React from "react";
import exitIcon from "../../resources/images/icons/exit-icon-50x50.png";
import helpIcon from "../../resources/images/icons/help-icon-512x512.png";
import shareIcon from "../../resources/images/icons/share-icon-512x512.png";
import printIcon from "../../resources/images/icons/print-icon-512x512.png";
import settingsIcon from "../../resources/images/icons/settings-512x512.png";

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
                        <li className="side-menu-option">
                            <img src={helpIcon} alt="Help icon"/>
                            Get Help
                        </li>
                        <li className="side-menu-option">
                            <img src={shareIcon} alt="Share map icon"/>
                            Share Map
                        </li>
                        <li className="side-menu-option">
                            <img src={printIcon} alt="Print icon"/>
                            Print Map
                        </li>
                        <li className="side-menu-option">
                            <img src={settingsIcon} alt="Search settings icon"/>
                            Search Settings
                        </li>
                    </ul>
                </section>

                <section className="side-menu-section">
                    <ul className="side-menu-options">
                        <li className="side-menu-option">Accessibility</li>
                        <li className="side-menu-option">Terms of Service</li>
                        <li className="side-menu-option">Privacy Policy</li>
                        <li className="side-menu-option">Report An Issue</li>
                    </ul>
                </section>

                {/*<footer className="side-menu-footer">*/}
                {/*    <p className="side-menu-copyright"><abbr>NCRP</abbr> <time>2022</time> &copy; - Negative Carbon Reforestation Project - All Rights Reserved</p>*/}
                {/*</footer>*/}
            </aside>
        </>
    );
})

export default SideMenu;