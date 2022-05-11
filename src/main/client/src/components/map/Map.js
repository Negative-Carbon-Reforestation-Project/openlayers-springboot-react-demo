import React, {useEffect} from "react"
import useMap from "./useMap"
import {useSelector} from "react-redux";

/**
 * Container for the OpenLayer Map
 * @param children The child components
 * @param zoom Initial resolution for the view
 * @param center Initial center for the view
 * @returns {JSX.Element}
 */
const Map = ({ children, zoom, center }) => {
    const { mapRef } = useMap(zoom, center);
    const isQueryable = useSelector((state) => state.maps.value.isQueryable);

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
            <div ref={mapRef} className="ol-map" tabIndex={0} aria-label="Map. Use arrow keys to pan the map." role="application">
                {children}
            </div>
    )
}

export default Map;