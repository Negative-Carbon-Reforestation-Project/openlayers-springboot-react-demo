import React, {useContext, useEffect, useRef, useState} from "react";
import MapContext from "../Map/MapContext";
import threeDimensional from "../../resources/images/dimension-control-3D.webp";
import twoDimensional from "../../resources/images/dimension-control-2D.webp";

const DimensionControl = () => {

    const { cesiumMap } = useContext(MapContext);
    const iconRef = useRef();

    /***
     * Toggles between the 3D cesium map and the 2D open layers map.
     */
    const toggleDimension = () => {
        cesiumMap.setEnabled(!cesiumMap.getEnabled());
        iconRef.current.src = cesiumMap.getEnabled() ? twoDimensional : threeDimensional;
    }

    return (
        <div className="control dimension-control" onClick={() => toggleDimension()}>
            <img ref={iconRef} className="layer-icon" src={threeDimensional} alt="layer-icon"/>
        </div>

    );
};

export default DimensionControl;