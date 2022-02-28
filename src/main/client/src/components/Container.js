import React from "react"
import MapContext from "./MapContext";
import useMap from "./useMap"

/**
 * Container for OpenLayer Map
 * @param children The child components
 * @param zoom Initial resolution for the view
 * @param center Initial center for the view
 * @returns {JSX.Element}
 */
const Map = ({ children, zoom, center }) => {
    const { mapRef, map } = useMap(zoom, center);



    return (
        <MapContext.Provider value={{ map }}>
            <div ref={mapRef} className="ol-map">
                {children}
            </div>
        </MapContext.Provider>
    )
}

export default Map;