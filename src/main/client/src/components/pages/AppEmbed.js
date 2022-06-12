import Map from "../map/Map";
import Layers from "../layers/Layers";
import Base from "../layers/Base";
import LandCover from "../layers/LandCover";
import Controls from "../controls/Controls";
import LayerControl from "../controls/LayerControl";
import CameraControl from "../controls/CameraControl";
import Overlays from "../overlays/Overlays";
import Marker from "../overlays/Marker";
import React from "react";

/**
 * Container for the App's embed
 * @returns {JSX.Element}
 * @constructor
 */
const AppEmbed = () => {
    return (
        <div className="map-container">
            <Map>
                <Layers>
                    <Base/>
                    <LandCover/>
                </Layers>

                <Controls>
                    <LayerControl/>
                    <CameraControl/>
                </Controls>

                <Overlays>
                    <Marker/>
                </Overlays>
            </Map>
        </div>
    )
};

export default AppEmbed;