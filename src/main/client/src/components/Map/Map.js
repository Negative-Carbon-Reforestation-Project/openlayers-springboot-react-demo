import React, {useEffect} from "react"
import MapContext from "./MapContext";
import useMap from "./useMap"

/**
 * Container for the OpenLayer Map
 * @param children The child components
 * @param zoom Initial resolution for the view
 * @param center Initial center for the view
 * @returns {JSX.Element}
 */
const Map = ({ children, zoom, center }) => {
    const { mapRef, map, cesiumMap, isQueryable, setQueryable } = useMap(zoom, center);

    useEffect(() => {
        mapRef.current.style.cursor = isQueryable ? "help" : "default";
    }, [isQueryable])



    return (
        <MapContext.Provider value={{ map, mapRef, cesiumMap, isQueryable, setQueryable }}>
            <div ref={mapRef} className="ol-map">
                {children}
            </div>
        </MapContext.Provider>
    )
}

export default Map;