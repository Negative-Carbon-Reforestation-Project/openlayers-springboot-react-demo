import {useSelector} from "react-redux";
import {toLonLat} from "ol/proj";
import {useEffect, useState} from "react";

/**
 * Container for query logic
 * @returns {{queryData: *, queryState: *}} The data of the query and the state of the query -- indicating whether the fetch was a success or fail.
 */
const useQuery = () => {
    const map = useSelector((state) => state.maps.value.map);

    const [toggleQueryMenu, setToggleQueryMenu] = useState(false);
    const [queryData, setQueryData] = useState({});
    const [queryState, setQueryState] = useState("fail");

    /**
     * Once the component is mounted onto the DOM, create the overlay and populate it via a click listener on the map.
     * Add a click listener for the popup closer as well.
     */
    useEffect(() => {
        if (!map) {
            return;
        }

        /**
         * Populates the OpenSearch query information when a single click is detected on the map.
         */
        map.on("singleclick", (event) => {

            const coordinate = event.coordinate;
            const longLatCoordsInfo = toLonLat(coordinate);

            setToggleQueryMenu(true);

            // fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/search/geo?latitude=${longLatCoordsInfo[1]}&longitude=${longLatCoordsInfo[0]}`)
            fetch(`https://${window.location.hostname}/api/search/geo?latitude=${longLatCoordsInfo[1]}&longitude=${longLatCoordsInfo[0]}`)
                .then((response) => response.json())
                .then((data) => {
                    setQueryData(data);
                    setQueryState("success");
                    }
                )
                .catch((error) => {
                    setQueryData({});
                    setQueryState("fail")
                });
        });
    }, [map]);

    return { toggleQueryMenu, queryData, queryState};
}

export default useQuery;