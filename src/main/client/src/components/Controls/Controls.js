import React, {useRef} from "react";
import ZoomControl from "./Zoom";
import LayerControl from "./Layer";
import DimensionControl from "./DimensionControl";

/**
 * Container for custom OpenLayer controls
 * @returns {JSX.Element}
 */
const Controls = () => {
    const controlBarRef = useRef();

    return (
        <div ref={controlBarRef} className="controls-bar">
            <ZoomControl target={controlBarRef}/>
            <LayerControl/>
            <DimensionControl/>
        </div>
    )
};

export default Controls;