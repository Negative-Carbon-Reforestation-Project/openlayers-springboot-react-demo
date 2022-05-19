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
            geometry: new Point(fromLonLat([-122.29567670312974, 47.41311574557329]))
        }),

        new Feature({
            geometry: new Point(fromLonLat([-125, 49]))
        }),

        new Feature({
            geometry: new Point(fromLonLat([-119, 45]))
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