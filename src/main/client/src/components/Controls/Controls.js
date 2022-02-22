import React, {useRef} from "react";
import ZoomControl from "./Zoom";
import LayerControl from "./Layer";

/**
 * Container for custom OpenLayer controls
 * @param children The child components
 * @returns {JSX.Element}
 */
const Controls = ({ children }) => {
    // return <div className="controls-bar">{children}</div>;
    const controlBarRef = useRef();

    return (
        <div ref={controlBarRef} className="controls-bar">
            <ZoomControl target={controlBarRef}/>
            <LayerControl/>
        </div>
    )
};

export default Controls;