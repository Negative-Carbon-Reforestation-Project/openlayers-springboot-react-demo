import React, {useContext} from "react";
import layerIcon512 from "../../resources/images/layer-control-512x512.webp";
import layerIcon20 from "../../resources/images/layer-control-20x20.webp";
import SideMenu from "../SideMenu";
import SideMenuContext from "../SideMenuContext";

const LayerControl = () => {

    const {sideMenuRef, layerMenuRef} = useContext(SideMenuContext)

    const showSideMenu = () => {
        sideMenuRef.current.style.display = "block";
        layerMenuRef.current.style.display = "block";
    }

    return (
        <div className="control layer-control" onClick={() => showSideMenu()}>
            <img className="layer-icon" src={layerIcon20} alt="layer-icon"/>
        </div>

    );
};

export default LayerControl;