import React, {useContext} from "react";
import layerIcon512 from "../../resources/images/icons/layer-control-512x512.webp";
import layerIcon20 from "../../resources/images/icons/layer-control-20x20.webp";
import SideMenu from "../Base/SideMenu";
import SideMenuContext from "../Base/SideMenuContext";

/**
 * Container for the Layer control
 * @returns {JSX.Element}
 */
const LayerControl = () => {

    const {sideMenuRef, layerMenuRef} = useContext(SideMenuContext)

    /**
     * Toggles the layer menu
     */
    const toggleLayerMenu = () => {
        sideMenuRef.current.classList.toggle("active");
        layerMenuRef.current.classList.toggle("active");
        layerMenuRef.current.focus();
    }

    return (
        <button
            className="control layer-control"
            onClick={() => toggleLayerMenu()}
            aria-label="Toggle layer menu"
            title="Toggle layer menu"
        >
            <img className="layer-icon" src={layerIcon20} alt="layer-icon"/>
        </button>

    );
};

export default LayerControl;