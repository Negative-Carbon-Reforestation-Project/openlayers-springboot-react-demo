import {useEffect, useState} from "react";
import Loader from "../utils/Loader";
import QueryResult from "../overlays/QueryResult";

/**
 * Container for query logic
 * @returns {{queryData: *, queryState: *}} The data of the query and the state of the query -- indicating whether the fetch was a success or fail.
 */
const useQuery = (coordinates, queryMenuRef) => {
    const [queryContent, setQueryContent] = useState();
    /**
     * Once the component is mounted onto the DOM, create the overlay and populate it via a click listener on the map.
     * Add a click listener for the popup closer as well.
     */
    useEffect(() => {
        // To test query menu easily,
        // 1) comment out display: none in the _queryMenu stylesheet (line 4)
        // 2) uncomment lines 20 - 29 -- this is the test data
        // 3) comment lines 32 - 36 and lines 41 - 56.
        let coordinates = [-123.52614545312973, 47.4289734461818];

        let testData = {
            "species":[{
                "wa_douglas_fir_stand_density":0.1306693506012141,
                "wa_western_hemlock_stand_density":0.11079886500382131
            }],
            "coordinates": coordinates,
            "wa_total_reforestation_opportunity":0
        };


        if (!coordinates) {
            return;
        }

        setQueryContent(<Loader loaderClass="spinner-loader"/>);

        let [longitude, latitude] = [...coordinates];
        setQueryContent(<QueryResult data={testData} queryMenuRef={queryMenuRef}/>);

        fetch(
            // `https://${window.location.hostname}/api/search/geo?latitude=${latitude}&longitude=${longitude}`
            `https://ncrp.app/api/search/geo?latitude=${latitude}&longitude=${longitude}`
        )
            .then((response) => response.json())
            .then((data) => {
                data["coordinates"] = coordinates;
                setQueryContent(<QueryResult data={data} queryMenuRef={queryMenuRef}/>);
            })
            .catch((error) => {
                // data["coordinates"] = coordinates;
                // setQueryContent(<QueryResult coordinate={coordinates} data={data}/>);
                console.log(error);
            });

    }, [coordinates]);

    return { queryContent };
};

export default useQuery;
