import React, {useContext, useEffect, useRef, useState} from "react";
import MapContext from "../Map/MapContext";
import threeDimensional from "../../resources/images/icons/dimension-control-3D.webp";
import twoDimensional from "../../resources/images/icons/dimension-control-2D.webp";
import {useSelector} from "react-redux";

/**
 * Container for the DimensionControl
 * @returns {JSX.Element}
 */
const DimensionControl = () => {
    const cesiumMap = useSelector((state) => state.maps.value.cesiumMap);
    const iconRef = useRef();

    /***
     * Toggles between the 3D cesium map and the 2D open layers map.
     */
    const toggleDimension = () => {
        cesiumMap.setEnabled(!cesiumMap.getEnabled());
        iconRef.current.src = cesiumMap.getEnabled() ? twoDimensional : threeDimensional;
    }

    return (
        <button
            className="control dimension-control"
            onClick={() => toggleDimension()}
            title="Toggle between 2D and 3D map"
            aria-label="Toggle between 2D and 3D map"
        >
            <img ref={iconRef} className="layer-icon" src={threeDimensional} alt="layer-icon"/>
        </button>

    );
};

export default DimensionControl;