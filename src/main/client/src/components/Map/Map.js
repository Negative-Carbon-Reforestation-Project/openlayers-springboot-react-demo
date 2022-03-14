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

    /**
     * Once the component is mounted onto the DOM, check whether the map is queryable.
     * If the map is queryable, the cursor icon will be changed.
     *
     * If the state of isQueryable changes, this will happen again.
     */
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