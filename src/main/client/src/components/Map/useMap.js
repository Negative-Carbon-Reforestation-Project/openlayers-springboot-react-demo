import { useRef, useState, useEffect } from "react";
import * as ol from "ol";
import OLCesium from "olcs/OLCesium";

/**
 * Encapsulated logic for the OL Map
 * @param zoom The initial zoom level for the map
 * @param center The initial center position for the map
 * @returns {{setQueryable: (value: (((prevState: boolean) => boolean) | boolean)) => void, cesiumMap: unknown, isQueryable: boolean, mapRef: React.MutableRefObject<undefined>, map: unknown}}
 */
const useMap = (zoom, center) => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    const [cesiumMap, setCesiumMap] = useState(null);
    const [isQueryable, setQueryable] = useState(false);

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

    /**
     * Once the component is mounted onto the DOM, generate the 3D cesium map.
     * If the state of the map changes, this function is called again.
     */
    useEffect(() => {
        if (!map)
        {
            return;
        }

        setCesiumMap(new OLCesium({map: map}));
    }, [map])

    return { mapRef, map, cesiumMap, isQueryable, setQueryable }
}

export default useMap;