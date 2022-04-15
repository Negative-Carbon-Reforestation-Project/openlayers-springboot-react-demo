import React from "react";
import usePopup from "./usePopup";

/**
 * Container for OpenLayer custom popup.
 * @returns {JSX.Element}
 */
const Popup = () => {
    const { popupRef, popupCloseButtonRef, popupContent } = usePopup();

    return (
        <div tabIndex={0} className="ol-popup" ref={popupRef} aria-label="Query Information">
            <button className="ol-popup-closeButton" ref={popupCloseButtonRef} aria-label="Close Popup"></button>
            <div className="ol-popup-content">{popupContent}</div>
        </div>
    )
}

export default Popup;
