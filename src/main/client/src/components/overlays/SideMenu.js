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
            <aside ref={ref} className="side-menu topo-skin" tabIndex={0} aria-label="Menu">
                <section className="side-menu-header">
                    <Logo className="side-menu-logo"/>
                    <button className="side-menu-exit" onClick={() => hideSideMenu()}>
                        <img src={exitIcon} alt="Exit menu"/>
                    </button>
                </section>

                <section className="side-menu-section">
                    <ul className="side-menu-options">
                        <li className="side-menu-option" aria-label="Get help" role="button" tabIndex={0}>
                            <img src={helpIcon} alt="Help icon"/>
                            Get Help
                        </li>
                        <li className="side-menu-option" aria-label="Share the map" role="button" tabIndex={0}>
                            <img src={shareIcon} alt="Share map icon"/>
                            Share Map
                        </li>
                        <li className="side-menu-option" aria-label="Print the map" role="button" tabIndex={0}>
                            <img src={printIcon} alt="Print icon"/>
                            Print Map
                        </li>
                        <li className="side-menu-option" aria-label="Change the search settings" role="button" tabIndex={0}>
                            <img src={settingsIcon} alt="Search settings icon"/>
                            Search Settings
                        </li>
                    </ul>
                </section>

                <section className="side-menu-section">
                    <ul className="side-menu-options">
                        <li className="side-menu-option">
                            <a href="/accessibility">Accessibility</a>
                        </li>
                        <li className="side-menu-option">
                            <a href="/terms">Terms Of Service</a>
                        </li>
                        <li className="side-menu-option">
                            <a href="/privacy">Privacy Policy</a>
                        </li>
                        <li className="side-menu-option">
                            <a href="https://github.com/Negative-Carbon-Reforestation-Project/openlayers-springboot-react-demo/issues/new?assignees=&labels=bug&template=bug_report.md&title=Bug%3A+%5BError%5D" target="_blank">Report An Issue</a>
                        </li>
                    </ul>
                </section>
            </aside>
        </>
    );
})

export default SideMenu;