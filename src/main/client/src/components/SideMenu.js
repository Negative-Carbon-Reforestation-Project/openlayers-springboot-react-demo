import React, {useRef} from "react";
import {Drawer} from "@mui/material";
import SideMenuContext from "./SideMenuContext";

/**
 * Container for side menu
 */
const SideMenu = ({children}) => {
    const layerMenuRef = useRef();
    const sideMenuRef = useRef();

    const hideSideMenu = () => {
        layerMenuRef.current.style.display = "none";
        sideMenuRef.current.style.display = "none";
    };

    return (
        <SideMenuContext.Provider value={{sideMenuRef, layerMenuRef}}>
            <div ref={sideMenuRef} className="side-menu">
                <div ref={layerMenuRef} className="layer-menu">
                    <section className="layer-menu-header">
                        <h1 className="layer-menu-heading">Layers</h1>
                        <button className="layer-menu-exit" onClick={() => hideSideMenu()}>X</button>
                    </section>
                </div>

            </div>
            <>
                {children}
            </>
        </SideMenuContext.Provider>
    )
}

export default SideMenu;