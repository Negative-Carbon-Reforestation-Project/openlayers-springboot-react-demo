import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLTileLayer from "ol/layer/Tile";

/**
 * Container for custom OpenLayer TileLayers
 * @param source The source image(s) for this layer
 * @param zIndex The z-index for layer rendering. Determines positioning of layers.
 * @returns {null}
 */
const TileLayer = ({ source, zIndex = 0 }) => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        let tileLayer = new OLTileLayer({
            source,
            zIndex,
        });

        map.addLayer(tileLayer);
        tileLayer.setZIndex(zIndex);

        return () => {
            if (map) {
                map.removeLayer(tileLayer);
            }
        };
    }, [map]);

    return null;
};

export default TileLayer;