import { useState, useEffect, useRef } from "react";
import {Overlay} from "ol";
import {toLonLat} from "ol/proj";
import Loader from "../utils/Loader";
import QueryResult from "../utils/QueryResult";
import QueryError from "../utils/QueryError";
import {useSelector} from "react-redux";

/**
 * Container for custom popup logic
 * @returns {{popupContent: JSX.Element, popupCloseButtonRef: React.MutableRefObject<undefined>, popupRef: React.MutableRefObject<undefined>}}
 */
const usePopup = () => {
    const popupRef = useRef();
    const popupCloseButtonRef = useRef();
    const [popupContent, setPopupContent] = useState(<div></div>);

    const map = useSelector((state) => state.maps.value.map);
    const isQueryable = useSelector((state) => state.maps.value.isQueryable);


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

        /**
         * Closes the popup
         */
        popupCloseButtonRef.current.onclick = () => {
            popupOverlay.setPosition(undefined);
            popupCloseButtonRef.current.blur();
            return false;
        };

        /**
         * Populates the popup with the OpenSearch query information.
         */
        map.on("singleclick", (event) => {
            if (!isQueryable)
            {
                return;
            }

            console.log("Map on entered");
            const coordinate = event.coordinate;
            const longLatCoordsInfo = toLonLat(coordinate);

            setPopupContent(<Loader/>)

            // fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/search/geo?latitude=${longLatCoordsInfo[1]}&longitude=${longLatCoordsInfo[0]}`)
            fetch(`https://${window.location.hostname}/api/search/geo?latitude=${longLatCoordsInfo[1]}&longitude=${longLatCoordsInfo[0]}`)
                .then((response) => response.json())
                .then((data) => setPopupContent(<QueryResult data={data} coordinate={coordinate}/>))
                .catch((error) => setPopupContent(<QueryError error={error}/>));

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