import React, {useRef} from "react";
import threeDimensional from "../../resources/images/icons/dimension-control-3D-20x20.webp";
import threeDimensionalFallback from "../../resources/images/icons/dimension-control-3D-20x20.png";
import twoDimensional from "../../resources/images/icons/dimension-control-2D-20x20.webp";
import twoDimensionalFallback from "../../resources/images/icons/dimension-control-2D-20x20.png";
import {useSelector} from "react-redux";

/**
 * Container for the DimensionControl
 * @returns {JSX.Element}
 */
const DimensionControl = () => {
    const cesiumMap = useSelector((state) => state.maps.value.cesiumMap);
    const icon3DRef = useRef();
    const icon2DRef = useRef();

    /***
     * Toggles between the 3D cesium map and the 2D open layers map.
     *
     * @remarks Hides / unhides the relevant icon for the active state of the dimension control
     */
    const toggleDimension = () => {
        cesiumMap.setEnabled(!cesiumMap.getEnabled());

        icon3DRef.current.hidden = cesiumMap.getEnabled();
        icon2DRef.current.hidden = !cesiumMap.getEnabled();

    }

    return (
        <button
            className="control dimension-control"
            onClick={() => toggleDimension()}
            title="Toggle between 2D and 3D map"
            aria-label="Toggle between 2D and 3D map"
        >
            <picture ref={icon3DRef}>
                <source
                    type="image/webp"
                    srcSet={`${threeDimensional}`}
                />

                <img className="control-icon" src={threeDimensionalFallback} alt="Toggle 3D Icon"/>
            </picture>

            <picture ref={icon2DRef} hidden={true}>
                <source
                        type="image/webp"
                        srcSet={`${twoDimensional}`}
                />

                <img className="control-icon" src={twoDimensionalFallback} alt="Toggle 2D Icon" loading="lazy"/>
            </picture>
        </button>

    );
};

export default DimensionControl;