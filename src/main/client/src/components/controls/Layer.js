import React, {useContext} from "react";
import layerIcon20 from "../../resources/images/icons/layer-control-20x20.webp";
import layerIcon20Fallback from "../../resources/images/icons/layer-control-20x20.png";
import SideMenuContext from "../base/SideMenuContext";

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
            <picture>
                <source type="image/webp"
                        srcSet={`${layerIcon20} 20w`}
                />

                 <img className="control-icon" src={layerIcon20Fallback} alt="Toggle layer menu icon"/>
            </picture>
        </button>

    );
};

export default LayerControl;