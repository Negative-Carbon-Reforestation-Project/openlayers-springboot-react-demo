import React, { useContext, useEffect, useRef, useState } from "react";
import MapContext from "../Map/MapContext";

import {Overlay} from "ol";
import {toLonLat} from "ol/proj";

import "../../styles/Popup.css"

/**
 * Container for OpenLayer custom popup.
 * @returns {JSX.Element}
 */
const Popup = () => {
    const { map } = useContext(MapContext);
    const popupRef = useRef();
    const popupCloserRef = useRef();
    const [popupContent, setPopupContent] = useState(<div></div>);

    /**
     * Once the component is mounted onto the DOM, create the overlay and populate it via a click listener on the map.
     * Add a click listener for the popup closer as well.
     */
    useEffect(() => {
        if (!map)
        {
            return;
        }

        let popupOverlay = new Overlay({
            element: popupRef.current,
            autoPan: true,
            autoPanAnimation: { duration: 250 }
        })

        popupCloserRef.current.onclick = () => {
            popupOverlay.setPosition(undefined);
            popupCloserRef.current.blur();
            return false;
        };

        map.addOverlay(popupOverlay);

        map.on("singleclick", function (evt) {
            const coordinate = evt.coordinate;
            const longLatInfo = toLonLat(coordinate);

            setPopupContent(
                <div>
                    <p>You clicked here:</p>
                    <code>Long: {longLatInfo[0]}</code>
                    <br/>
                    <code>Lat: {longLatInfo[1]}</code>
                </div>
            );


            popupOverlay.setPosition(coordinate);
        });

        return () => {
            if (map)
            {
                map.removeOverlay(popupOverlay);
            }
        };
    }, [map]);

    return (
        <div className="ol-popup" ref={popupRef}>
            <a href="#" className="ol-popup-closer" ref={popupCloserRef}/>
            <div className="popup-content">{popupContent}</div>
        </div>
    )
}

export default Popup;
