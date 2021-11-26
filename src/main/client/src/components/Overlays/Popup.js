import React from "react";
import usePopup from "./usePopup";
import "../../styles/Popup.css"

/**
 * Container for OpenLayer custom popup.
 * @returns {JSX.Element}
 */
const Popup = () => {
    const { popupRef, popupCloseButtonRef, popupContent } = usePopup();

    return (
        <div className="ol-popup" ref={popupRef}>
            <a href="#" className="ol-popup__closeButton" ref={popupCloseButtonRef}/>
            <div className="ol-popup__content">{popupContent}</div>
        </div>
    )
}

export default Popup;
