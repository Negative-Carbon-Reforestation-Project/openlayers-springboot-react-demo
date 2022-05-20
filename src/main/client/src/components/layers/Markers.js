import {Feature} from "ol";
import {Point} from "ol/geom";
import {fromLonLat} from "ol/proj";
import {Icon, Style} from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "./VectorLayer";

/**
 * Container for Markers layer
 * @returns {JSX.Element}
 * @remark Markers are considered to be "features" so their geometry and styling must be defined before
 * appending it to the vector layer.
 *
 * When defining an image for the icon style, our map marker on our directory didn't work so it had to be uploaded to a cdn.
 *
 * The features are reforestation areas that have opportunities >= 75%.
 * The OpenSearch query Matt used to find the feature coordinates was:
 *
 * GET /wa_total_reforestation_opportunity/_search
 * {
 *   "query": {
 *   "bool": {
 *      "must": [
 *          {
 *              "range": {
 *                  "wa_total_reforestation_opportunity": {"gte": 0.75 }
 *              }
 *          }
 *       ]
 *     }
 *   }
 * }
 */
const Markers = () => {

    const style = new Style({
        image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            anchorOrigin: "bottom-left",
            src: "https://i.imgur.com/n1EJQDY.png",
        }),
    });

    const features = [
        new Feature({
            geometry: new Point(fromLonLat([-117.6518, 46.4222]))
        }),

        new Feature({
            geometry: new Point(fromLonLat([-122.2705, 45.5902]))
        }),

        new Feature({
            geometry: new Point(fromLonLat([-122.1151, 45.621]))
        }),

        new Feature({
            geometry: new Point(fromLonLat([-122.0996, 45.6241]))
        }),

        new Feature({
            geometry: new Point(fromLonLat([-121.9807, 45.6475]))
        }),

        new Feature({
            geometry: new Point(fromLonLat([-121.565, 45.7286]))
        }),

        new Feature({
            geometry: new Point(fromLonLat([-121.5283, 45.7357]))
        }),

        new Feature({
            geometry: new Point(fromLonLat([-121.5279, 45.7358]))
        }),

        new Feature({
            geometry: new Point(fromLonLat([-121.5205, 45.7372]))
        }),

        new Feature({
            geometry: new Point(fromLonLat([-121.5193, 45.7375]))
        })
    ]

    const source = new VectorSource({
        features: [...features]
    });


    return (
        <>
            <VectorLayer source={source} style={style} zIndex={5}/>
        </>
    )
}

export default Markers;