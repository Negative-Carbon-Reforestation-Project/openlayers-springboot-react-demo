import { useRef, useEffect } from "react";
import {View, Map, Overlay} from "ol";
import OLCesium from "olcs/OLCesium";
import {CesiumTerrainProvider, createWorldTerrain} from "cesium";
import {useDispatch, useSelector} from "react-redux";
import {addCesiumMap, addMap, addMarker, removeMarker} from "../../redux/reducers/mapReducer";

/**
 * Encapsulated logic for the OL Map
 * @param zoom The initial zoom level for the map
 * @param center The initial center position for the map
 * @returns {{mapRef: React.MutableRefObject<undefined>}}
 */
const useMap = (zoom, center) => {
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
            view: new View({
                zoom,
                center
            }),
            layers: [],
            controls: [],
            overlays: []
        };

        let mapObject = new Map(options);

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

    }, [center]);

    /**
     * Once the component is mounted onto the DOM, generate the 3D cesium map and the world terrain.
     * If the state of the map changes, this function is called again.
     *
     * @remark window.Cesium is imported from Cesium.js script in index.html
     */
    useEffect(() => {
        if (!map)
        {
            return;
        }

        window.Cesium.Ion.defaultAccessToken = process.env.REACT_APP_CESIUMTOKEN;

        let cesiumMapObject = new OLCesium({map: map});
        let scene = cesiumMapObject.getCesiumScene();
        scene.terrainProvider = new CesiumTerrainProvider({
            url: window.Cesium.IonResource.fromAssetId(1)
        });

        dispatch(addCesiumMap({cesiumMap: cesiumMapObject}))
    }, [map]);


    /**
     * Once the component is mounted onto the DOM, create a marker overlay on click.
     */
    useEffect(() => {
        if (!map) {
            return;
        }

        let marker = new Overlay({
            id: "map-marker",
            element: document.getElementById("map-marker"),
            autoPan: true,
            autoPanAnimation: { duration: 250 }
        });

        map.addOverlay(marker);
        marker.setPosition(undefined);

        map.on("singleclick", (event) => {

            let marker = map.getOverlayById("map-marker");

            if (marker.getPosition() === undefined)
            {
                dispatch(addMarker({position: event.coordinate}));
            }
            else
            {
                dispatch(removeMarker());
            }

            return () => {
                if (map)
                {
                    dispatch(removeMarker());
                }
            };
        });

    }, [map]);

    return { mapRef }
}

export default useMap;