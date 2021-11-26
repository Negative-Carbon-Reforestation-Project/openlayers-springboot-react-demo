import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLVectorLayer from "ol/layer/Vector";

/**
 * Container for custom OpenLayer VectorLayers
 * @param source The source image(s) for this layer
 * @param style The style function for the layer
 * @param zIndex The z-index for layer rendering. Determines positioning of layers, default is 0.
 * @returns {null}
 */
const VectorLayer = ({ source, style, zIndex = 0 }) => {
    const { map } = useContext(MapContext);

    /**
     * Once the component is mounted onto the DOM, construct a vector layer and append it to the map
     * using the shared MapContext.
     */
    useEffect(() => {
        if (!map)
        {
            return;
        }

        let vectorLayer = new OLVectorLayer({
            source,
            style
        });

        map.addLayer(vectorLayer);
        vectorLayer.setZIndex(zIndex);

        return () => {
            if (map)
            {
                map.removeLayer(vectorLayer);
            }
        };

    }, [map]);

    return null;
};

export default VectorLayer;