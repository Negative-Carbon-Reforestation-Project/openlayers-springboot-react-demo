import {useEffect, useState} from "react";
import Loader from "../utils/Loader";
import QueryResult from "../overlays/QueryResult";
import QueryError from "./QueryError";

/**
 * Container for query logic
 * @returns {{queryData: *, queryState: *}} The data of the query and the state of the query -- indicating whether the fetch was a success or fail.
 */
const useQuery = (coordinates) => {
    const [queryContent, setQueryContent] = useState();
    /**
     * Once the component is mounted onto the DOM, create the overlay and populate it via a click listener on the map.
     * Add a click listener for the popup closer as well.
     */
    useEffect(() => {
        if (!coordinates) {
            return;
        }

        setQueryContent(<Loader loaderClass="spinner-loader"/>);

        let [longitude, latitude] = [...coordinates];

        fetch(`https://ncrp.app/api/search/geo?latitude=${latitude}&longitude=${longitude}`)
            .then((response) => response.json())
            .then((data) => {
                data["coordinates"] = coordinates;
                setQueryContent(<QueryResult data={data}/>);
            })
            .catch((error) => {
                setQueryContent(<QueryError/>);
            });

    }, [coordinates]);

    return { queryContent };
};

export default useQuery;
