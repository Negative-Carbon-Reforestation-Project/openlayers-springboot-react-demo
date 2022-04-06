import React, {useContext, useRef, useState} from "react";
import cursorIcon from "../../resources/images/cursor-info.webp";
import cursorIconActive from "../../resources/images/cursor-info-active.webp";
import MapContext from "../Map/MapContext";
import {useDispatch} from "react-redux";
import {setQueryable} from "../../redux/reducers/mapReducer";

/**
 * Container for QueryLocation control
 * @returns {JSX.Element}
 */
const QueryLocationControl = ({tabIndex}) => {
    const iconRef = useRef();
    const [controlActive, setControlActive] = useState(false);
    const dispatch = useDispatch();

    /**
     * Toggles the query feature
     */
    const toggleQueryPointer = () => {
        let isControlActive = !controlActive;

        iconRef.current.src = isControlActive ? cursorIconActive
                                              : cursorIcon;

        dispatch(setQueryable({isQueryable: isControlActive}));
        setControlActive(isControlActive);
    }

    return (
        <button className="control query-location-control" onClick={() => toggleQueryPointer()} aria-label="Toggle query mode" tabIndex={tabIndex}>
            <img ref={iconRef} className="query-location-control-icon" src={cursorIcon} alt="cursor"/>
        </button>

    );
};

export default QueryLocationControl;