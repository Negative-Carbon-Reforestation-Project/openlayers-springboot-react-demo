import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";

/**
 * Container for OpenLayer Map
 * @param children The child components
 * @param zoom Initial resolution for the view
 * @param center Initial center for the view
 * @returns {JSX.Element}
 */
const Map = ({ children, zoom, center }) => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);

    /**
     * Once the component is mounted onto the DOM, construct a new map with the given view.
     */
    useEffect(() => {
        let options = {
            view: new ol.View({ zoom, center }),
            layers: [],
            controls: [],
            overlays: []
        };

        let mapObject = new ol.Map(options);
        mapObject.setTarget(mapRef.current);
        setMap(mapObject);

        return () => mapObject.setTarget(undefined);
    }, []);

    /**
     * Once the component is mounted onto the DOM, set the zoom level on the map.
     * If the state of zoom changes, this function is called again.
     */
    useEffect(() => {
        if (!map)
        {
            return;
        }

        map.getView().setZoom(zoom);
    }, [zoom]);

    /**
     * Once the component is mounted onto the DOM, center the view on the map.
     * If the state of center changes, this function is called again.
     */
    useEffect(() => {
        if (!map)
        {
            return;
        }

        map.getView().setCenter(center)
    }, [center])


    return (
        <MapContext.Provider value={{ map }}>
            <div ref={mapRef} className="ol-map">
                {children}
            </div>
        </MapContext.Provider>
    )
}

export default Map;