import React, {useContext} from "react";
import layerIcon512 from "../../resources/images/layer-control-512x512.webp";
import layerIcon20 from "../../resources/images/layer-control-20x20.webp";
import SideMenu from "../SideMenu";
import SideMenuContext from "../SideMenuContext";

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
        let currentDisplay = layerMenuRef.current.style.display;
        let toggleDisplay = currentDisplay === "block" ? "none" : "block";

        sideMenuRef.current.style.display = toggleDisplay;
        layerMenuRef.current.style.display = toggleDisplay;
    }

    return (
        <div className="control layer-control" onClick={() => toggleLayerMenu()}>
            <img className="layer-icon" src={layerIcon20} alt="layer-icon"/>
        </div>

    );
};

export default LayerControl;