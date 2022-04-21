import { useRef, useEffect } from "react";
import * as ol from "ol";
import OLCesium from "olcs/OLCesium";
import {createWorldTerrain} from "cesium";
import {useDispatch, useSelector} from "react-redux";
import {addCesiumMap, addMap} from "../../redux/reducers/mapReducer";
import {transformExtent} from "ol/proj";

/**
 * Encapsulated logic for the OL Map
 * @param zoom The initial zoom level for the map
 * @param center The initial center position for the map
 * @returns {{mapRef: React.MutableRefObject<undefined>}}
 */
const useMap = (zoom, center) => {
    const washingtonStateBoundingBox = [-124.763068, 45.543541, -116.915989, 49.002494];

    const mapRef = useRef();
    const map = useSelector((state) => state.maps.value.map);

    const dispatch = useDispatch();

    /**
     * Once the component is mounted onto the DOM, construct a new map with the given view.
     *
     * @remarks The view is bounded to Washington state with the extent property.
     */
    useEffect(() => {
        let options = {
            view: new ol.View({
                zoom,
                center,
                // extent: transformExtent(washingtonStateBoundingBox, 'EPSG:4326', 'EPSG:3857')
            }),
            layers: [],
            controls: [],
            overlays: []
        };

        let mapObject = new ol.Map(options);

        mapObject.setTarget(mapRef.current);
        dispatch(addMap({map: mapObject}));

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

        map.getView().setCenter(center);

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

        let cesiumMapObject = new OLCesium({map: map});
        let scene = cesiumMapObject.getCesiumScene();
        scene.terrainProvider = createWorldTerrain();


        dispatch(addCesiumMap({cesiumMap: cesiumMapObject}))
    }, [map])

    return { mapRef }
}

export default useMap;