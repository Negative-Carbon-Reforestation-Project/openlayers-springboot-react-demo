import React, {useRef, useState} from "react";
import cursorIcon from "../../resources/images/icons/cursor-info-20x20.webp";
import cursorIconFallback from "../../resources/images/icons/cursor-info-20x20.png";
import cursorIconActive from "../../resources/images/icons/cursor-info-active-20x20.webp";
import cursorIconActiveFallback from "../../resources/images/icons/cursor-info-active-20x20.png";
import {useDispatch} from "react-redux";
import {setQueryable} from "../../redux/reducers/mapReducer";

/**
 * Container for QueryLocation control
 * @returns {JSX.Element}
 */
const QueryLocationControl = () => {
    const cursorIconRef = useRef();
    const cursorIconActiveRef = useRef();

    const [controlActive, setControlActive] = useState(false);
    const dispatch = useDispatch();

    /**
     * Toggles the query feature
     *
     * @remarks Hides / unhides the relevant icon for the active state of the query control
     */
    const toggleQueryPointer = () => {
        let isControlActive = !controlActive;

        cursorIconRef.current.hidden = !controlActive;
        cursorIconActiveRef.current.hidden = controlActive;

        dispatch(setQueryable({isQueryable: isControlActive}));
        setControlActive(isControlActive);
    }

    return (
        <button
            className="control query-location-control"
            onClick={() => toggleQueryPointer()}
            aria-label="Toggle query mode"
            title="Toggle query mode"
        >
            <picture ref={cursorIconRef}>
                <source type="image/webp"
                        srcSet={`${cursorIcon}`}
                />

                <img className="control-icon" src={cursorIconFallback} alt="Toggle query mode icon"/>
            </picture>

            <picture ref={cursorIconActiveRef} hidden={true}>
                <source type="image/webp"
                        srcSet={`${cursorIconActive}`}
                />

                <img className="control-icon" src={cursorIconActiveFallback} alt="Toggle query mode icon" loading="lazy"/>
            </picture>

        </button>

    );
};

export default QueryLocationControl;