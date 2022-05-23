import {useDispatch, useSelector} from "react-redux";
import { toLonLat } from "ol/proj";
import { useEffect, useState } from "react";
import {addMarker, removeMarker} from "../../redux/reducers/mapReducer";

/**
 * Container for query logic
 * @returns {{queryData: *, queryState: *}} The data of the query and the state of the query -- indicating whether the fetch was a success or fail.
 */
const useQuery = () => {
    const map = useSelector((state) => state.maps.value.map);
    const dispatch = useDispatch();

    const [queryData, setQueryData] = useState({
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

    const [toggleQueryMenu, setToggleQueryMenu] = useState(false);

    /**
     * Get a feature at the given pixel
     * @param pixel The pixel
     * @returns {Feature} The feature at the given position
     */
    const getFeatureAtPixel = (pixel) => {
        let feature = map.forEachFeatureAtPixel(pixel, (feature) => {
            return feature
        });

        return feature;
    }

    /**
     * Once the component is mounted onto the DOM, create the overlay and populate it via a click listener on the map.
     * Add a click listener for the popup closer as well.
     */
    useEffect(() => {
        if (!map) {
            return;
        }

        /**
         * When the map is clicked, check to see if a feature was clicked on.
         *
         * If there was a feature at the clicked position, we read it's info and launch the query menu.
         * Otherwise, we create a new feature at the position containing the coordinates.
         */
        map.on("singleclick", (event) => {
            const coordinate = event.coordinate;
            const longLatCoordsInfo = toLonLat(coordinate);

            let featureAtPixel = getFeatureAtPixel(event.pixel);

            if (featureAtPixel)
            {
                let longLatCoordinates = toLonLat(featureAtPixel.get("coordinates"));
                let species = featureAtPixel.get("species");
                let opportunity = featureAtPixel.get("wa_total_reforestation_opportunity");

                let featureHasData = species !== undefined && opportunity !== undefined;

                if (featureHasData)
                {
                    queryData.coordinates = longLatCoordinates;
                    queryData.species = species;
                    queryData.wa_total_reforestation_opportunity = opportunity;

                    console.log(queryData);
                    setQueryData(queryData);
                    setToggleQueryMenu(true);
                }
                else
                {
                   fetch(
                        // `https://${window.location.hostname}/api/search/geo?latitude=${longLatCoordsInfo[1]}&longitude=${longLatCoordsInfo[0]}`
                        `https://ncrp.app/api/search/geo?latitude=${longLatCoordinates[1]}&longitude=${longLatCoordinates[0]}`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            data["coordinates"] = longLatCoordsInfo;
                            setQueryData(data);
                            setToggleQueryMenu(true);
                        })
                        .catch((error) => {
                            queryData["coordinates"] = longLatCoordsInfo;

                        });
                }
            }
            else
            {
                dispatch(addMarker({coordinates: coordinate}));
            }

        });

        /**
         * When the map is double clicked, check to see if a feature was clicked on.
         *
         * If there was a feature at the clicked position, remove it.
         * Otherwise, return.
         */
        map.on("dblclick", (event) => {
            event.stopPropagation();

            let featureAtPixel = getFeatureAtPixel(event.pixel);

            if (featureAtPixel)
            {
                dispatch(removeMarker({feature: featureAtPixel}));
            }
        });

    }, [map]);

    return { queryData, toggleQueryMenu, setToggleQueryMenu };
};

export default useQuery;
