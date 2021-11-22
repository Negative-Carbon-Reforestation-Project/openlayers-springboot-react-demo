import React, { useContext, useEffect, useRef, useState } from "react";
import MapContext from "../Map/MapContext";

import {Overlay} from "ol";
import {toLonLat} from "ol/proj";

import "./Popup.css"

const Popup = () => {
    const { map } = useContext(MapContext);
    const popupRef = useRef();
    const popupCloserRef = useRef();
    const [popupContent, setPopupContent] = useState(<div></div>);

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

        popupCloserRef.current.onClick = () => {
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
            <div id="popup-content">{popupContent}</div>
        </div>
    )
}

export default Popup;
