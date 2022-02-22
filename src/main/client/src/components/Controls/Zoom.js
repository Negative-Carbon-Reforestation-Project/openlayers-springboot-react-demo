import React, { useContext, useEffect, useState } from "react";
import { Zoom } from "ol/control";
import MapContext from "../Map/MapContext";


/**
 * Component for custom OpenLayer zoom control.
 * @returns {null}
 */
const ZoomControl = () => {
    const { map } = useContext(MapContext);

    /**
     * Once the component is mounted onto the DOM, extend the zoom control and append it onto the map
     * using the shared MapContext. If the state of map changes, this function is called again.
     */
    useEffect(() => {
        if (!map)
        {
            return;
        }

        let zoomControl = new Zoom({
            className: "ol-zoom",
            zoomInClassName: "control ol-zoom-in",
            zoomOutClassName: "control ol-zoom-out"
        });

        map.controls.push(zoomControl);

        return () => map.controls.remove(zoomControl);
    }, [map])

    return null;
};

export default ZoomControl;