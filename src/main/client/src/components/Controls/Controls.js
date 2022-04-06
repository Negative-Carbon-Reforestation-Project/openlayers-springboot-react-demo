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
        <div ref={controlBarRef} className="controls-bar" aria-label="Contains controls for the map" tabIndex={1}>
            <LayerControl tabIndex={2}/>
            <QueryLocationControl tabIndex={3}/>
            <DimensionControl tabIndex={4}/>
            <ZoomControl target={controlBarRef} tabIndex={5}/>
        </div>
    )
};

export default Controls;