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
        
        if (!coordinates) {
            return;
        }

        setQueryContent(<Loader/>);

        fetch(
            // `https://${window.location.hostname}/api/search/geo?latitude=${longLatCoordsInfo[1]}&longitude=${longLatCoordsInfo[0]}`
            `https://ncrp.app/api/search/geo?latitude=${coordinates[1]}&longitude=${coordinates[0]}`
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
