import React from "react";
import usePopup from "./usePopup";

/**
 * Container for OpenLayer custom popup.
 * @returns {JSX.Element}
 */
const Popup = () => {
    const { popupRef, popupCloseButtonRef, popupContent } = usePopup();

    return (
        <div className="ol-popup" ref={popupRef}>
            <a href="#" className="ol-popup-closeButton" ref={popupCloseButtonRef}/>
            <div className="ol-popup-content">{popupContent}</div>
        </div>
    )
}

export default Popup;
