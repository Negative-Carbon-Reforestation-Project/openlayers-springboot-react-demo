import { useSelector } from "react-redux";
import { toLonLat } from "ol/proj";
import { useEffect, useState } from "react";

/**
 * Container for query logic
 * @returns {{queryData: *, queryState: *}} The data of the query and the state of the query -- indicating whether the fetch was a success or fail.
 */
const useQuery = () => {
    const map = useSelector((state) => state.maps.value.map);

    const [toggleQueryMenu, setToggleQueryMenu] = useState(false);
    // TODO
    // FIX THIS TO MAKE IT WORK WITH LIVE DATA
    const [queryData, setQueryData] = useState(
        {
        coordinates: [-121.09816693750474, 46.97265094694316],
        species: [
            {
                wa_red_alder_stand_density: 0.03916090117942264,
                wa_douglas_fir_stand_density: 0.06239649651393181,
                wa_western_hemlock_stand_density: 0.08214589467583308,
            },
        ],
        wa_total_reforestation_opportunity: 75,
    }
    );

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
        // debugger;
        map.on("singleclick", (event) => {
            const coordinate = event.coordinate;
            const longLatCoordsInfo = toLonLat(coordinate);
            // debugger;

            setToggleQueryMenu(true);

            // fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/search/geo?latitude=${longLatCoordsInfo[1]}&longitude=${longLatCoordsInfo[0]}`)
            // TODO 
            // HARDCODED ncrp.app FOR TESTING 
            fetch(
                // `https://${window.location.hostname}/api/search/geo?latitude=${longLatCoordsInfo[1]}&longitude=${longLatCoordsInfo[0]}`
                `https://ncrp.app/api/search/geo?latitude=${longLatCoordsInfo[1]}&longitude=${longLatCoordsInfo[0]}`
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    data["coordinates"]=longLatCoordsInfo;
                    setQueryData(data);
                    setQueryState("success");
                })
                .catch((error) => {
                    //debugger;
                    console.log(longLatCoordsInfo);
                    queryData["coordinates"]=longLatCoordsInfo;
                    console.log(queryData);
                    setQueryState("fail");
                });
        });
    }, [map]);

    return { toggleQueryMenu, queryData, queryState };
};

export default useQuery;
