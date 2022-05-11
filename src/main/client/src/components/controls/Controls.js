import React, {useRef} from "react";
import ZoomControl from "./Zoom";
import LayerControl from "./Layer";
import DimensionControl from "./DimensionControl";
import QueryLocationControl from "./QueryLocation";

/**
 * Container for custom OpenLayer controls
 * @returns {JSX.Element}
 */
const Controls = () => {
    const controlBarRef = useRef();

    return (
        <div ref={controlBarRef} className="controls-bar" aria-label="Contains controls for the map" tabIndex={0}>
            <LayerControl />
            <QueryLocationControl />
            <DimensionControl />
            <ZoomControl target={controlBarRef}/>
        </div>
    )
};

export default Controls;