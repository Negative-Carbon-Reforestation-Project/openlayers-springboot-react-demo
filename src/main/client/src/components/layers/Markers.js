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
            geometry: new Point(fromLonLat([-117.6518, 46.4222])),
            coordinates: [-117.6518, 46.4222],
            species: "Not available",
            wa_total_reforestation_opportunity:0.6714531865979475
        }),

        new Feature({
            geometry: new Point(fromLonLat([-122.2705, 45.5902])),
            coordinates: [-122.2705, 45.5902],
            species: [{wa_red_alder_stand_density:0.09502671953732517, wa_douglas_fir_stand_density:0.03332402124079444}],
            wa_total_reforestation_opportunity:0.25177993950555794

        }),

        new Feature({
            geometry: new Point(fromLonLat([-122.1151, 45.621])),
            coordinates: [-122.1151, 45.621],
            species: [{wa_douglas_fir_stand_density:0.07747055812122891, wa_western_hemlock_stand_density:1}],
            wa_total_reforestation_opportunity:0.17426299338356707
        }),

        new Feature({
            geometry: new Point(fromLonLat([-122.0996, 45.6241])),
            coordinates: [-122.0996, 45.6241],
            species: [{
                wa_red_alder_stand_density: 0.0660600166623552,
                wa_douglas_fir_stand_density:0.02914032018954929,
                wa_western_hemlock_stand_density:0.05131252024270728}
            ],
            wa_total_reforestation_opportunity: 0.2149515545164109
        }),

        new Feature({
            geometry: new Point(fromLonLat([-121.9807, 45.6475])),
            coordinates: [-121.9807, 45.6475],
            species: [{wa_douglas_fir_stand_density: 0.13071630918223942}],
            wa_total_reforestation_opportunity: 0.17226644430412266
        }),

        new Feature({
            geometry: new Point(fromLonLat([-121.565, 45.7286])),
            coordinates: [-121.565, 45.7286],
            species: [{wa_douglas_fir_stand_density:0.026731752675510968}],
            wa_total_reforestation_opportunity:0.8054981097198534
        }),

        new Feature({
            geometry: new Point(fromLonLat([-121.5283, 45.7357])),
            coordinates: [-121.5283, 45.7357],
            species: [{wa_douglas_fir_stand_density:0.09158751700534297}],
            wa_total_reforestation_opportunity: 0.7932337575342185
        }),

        new Feature({
            geometry: new Point(fromLonLat([-121.5279, 45.7358])),
            coordinates: [-121.5279, 45.7358],
            species: "Not available",
            wa_total_reforestation_opportunity: 0.8451186976310459
        }),

        new Feature({
            geometry: new Point(fromLonLat([-121.5205, 45.7372])),
            coordinates: [-121.5205, 45.7372],
            species: [{wa_douglas_fir_stand_density:0.04739369477036267}],
            wa_total_reforestation_opportunity: 0.8099537907867975
        }),

        new Feature({
            geometry: new Point(fromLonLat([-121.5193, 45.7375])),
            coordinates: [-121.5193, 45.7375],
            species: [{wa_douglas_fir_stand_density: 0.04992272025977223}],
            wa_total_reforestation_opportunity: 0.886827068022241
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