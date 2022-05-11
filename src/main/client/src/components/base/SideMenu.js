import React, { useRef } from "react";
import SideMenuContext from "./SideMenuContext";
import LayerMenu from "./LayerMenu";

/**
 * Container for side menu
 */
const SideMenu = ({children}) => {
    const layerMenuRef = useRef();
    const sideMenuRef = useRef();

    return (
        <SideMenuContext.Provider value={{sideMenuRef, layerMenuRef}}>
            <div ref={sideMenuRef} className="side-menu">
                <LayerMenu/>
            </div>
            <>
                {children}
            </>
        </SideMenuContext.Provider>
    )
}

export default SideMenu;