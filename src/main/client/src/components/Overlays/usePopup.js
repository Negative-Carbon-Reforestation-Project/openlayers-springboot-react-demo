import { useState, useEffect, useRef, useContext } from "react";
import {Overlay} from "ol";
import MapContext from "../Map/MapContext";
import {toLonLat} from "ol/proj";

/**
 * Container for custom popup logic
 * @returns {{popupContent: JSX.Element, popupCloseButtonRef: React.MutableRefObject<undefined>, popupRef: React.MutableRefObject<undefined>}}
 */
const usePopup = (layerIndex=7) => {
    const { map, isQueryable } = useContext(MapContext);
    const popupRef = useRef();
    const popupCloseButtonRef = useRef();
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

        map.addOverlay(popupOverlay);

        popupCloseButtonRef.current.onclick = () => {
            popupOverlay.setPosition(undefined);
            popupCloseButtonRef.current.blur();
            return false;
        };

        map.on("singleclick", function (event) {
            if (!isQueryable)
            {
                return;
            }

            let projection = map.getView().getResolution();

            let layers = map.getLayers();

            let desiredLayer = layers.item(layerIndex);
            let desiredLayerSource = desiredLayer.getSource();
            let url = desiredLayerSource.getFeatureInfoUrl(event.coordinate, projection, "EPSG:4326", {"INFO_FORMAT": "text/html"});

            // if (url)
            // {
            debugger;

            const coordinate = event.coordinate;
            const longLatInfo = toLonLat(coordinate);

            fetch(`http://localhost:8082/api/search/geo?latitude=${longLatInfo[1]}&longitude=${longLatInfo[0]}`)
                    .then((response) => response.text())
                    .then((data) => setPopupContent(<div>{data}</div>));
            // }

            // const coordinate = event.coordinate;
            // const longLatInfo = toLonLat(coordinate);

            // setPopupContent(
            //     <div>
            //         <p>You clicked here:</p>
            //         <code>Long: {longLatInfo[0]}</code>
            //         <br/>
            //         <code>Lat: {longLatInfo[1]}</code>
            //     </div>
            // );

            // setPopupContent(<div className={"loader"}></div>)



            popupOverlay.setPosition(coordinate);
        });

        return () => {
            if (map)
            {
                map.removeOverlay(popupOverlay);
            }
        };

    }, [map, isQueryable]);

    return { popupRef, popupCloseButtonRef, popupContent };
};

export default usePopup;