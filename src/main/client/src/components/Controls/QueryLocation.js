import React, {useContext, useRef, useState} from "react";
import cursorIcon from "../../resources/images/cursor-info.webp";
import cursorIconActive from "../../resources/images/cursor-info-active.webp";
import MapContext from "../Map/MapContext";

/**
 * Container for QueryLocation control
 * @returns {JSX.Element}
 */
const QueryLocationControl = () => {

    const { setQueryable } = useContext(MapContext);

    const iconRef = useRef();
    const [controlActive, setControlActive] = useState(false);

    /**
     * Toggles the query feature
     */
    const toggleQueryPointer = () => {
        setControlActive(!controlActive);
        iconRef.current.src = controlActive ? cursorIconActive : cursorIcon;

        setQueryable(controlActive);
    }

    return (
        <div className="control query-location-control" onClick={() => toggleQueryPointer()}>
            <img ref={iconRef} className="query-location-control-icon" src={cursorIcon} alt="cursor"/>
        </div>

    );
};

export default QueryLocationControl;