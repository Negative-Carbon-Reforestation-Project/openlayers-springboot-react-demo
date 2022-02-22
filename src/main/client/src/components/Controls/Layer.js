import React from "react";
import layerIcon512 from "../../resources/images/layer-control-512x512.webp";
import layerIcon20 from "../../resources/images/layer-control-20x20.webp";

const LayerControl = () => {
    return (
        <div className="control layer-control">
            <img className="layer-icon" src={layerIcon20} alt="layer-icon"/>
        </div>
    );
};

export default LayerControl;