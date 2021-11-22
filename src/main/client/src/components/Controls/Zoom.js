import React, { useContext, useEffect, useState } from "react";
import { Zoom } from "ol/control";
import MapContext from "../Map/MapContext";

import "./Zoom.css"

/**
 * Component for custom OpenLayer zoom control.
 * @returns {null}
 * @constructor
 */
const ZoomControl = () => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map)
        {
            return;
        }

        let zoomControl = new Zoom();
        map.controls.push(zoomControl);

        return () => map.controls.remove(zoomControl);
    }, [map])

    return null;
};

export default ZoomControl;