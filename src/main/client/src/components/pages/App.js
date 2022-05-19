import React, {useEffect, useState} from 'react';

import Map from "../map/Map";
import Layers from "../layers/Layers";
import Controls from "../controls/Controls";
import { fromLonLat } from "ol/proj";
import Overlays from "../overlays/Overlays";
import SearchBar from "../base/SearchBar";
import QueryMenu from "../overlays/QueryMenu";
import LayerControl from "../controls/LayerControl";
import CameraControl from "../controls/CameraControl";
import Base from "../layers/Base";
import LandCover from "../layers/LandCover";
import Markers from "../layers/Markers";

/**
 * Component for the React applicaation
 * @returns {JSX.Element}
 */
const App = () => {
    const washingtonCoordinates = [-122.29567670312974, 47.41311574557329];
    const [center, setCenter] = useState(washingtonCoordinates);
    const [zoom, setZoom] = useState(6);


    /**
     * Once the component is mounted onto the DOM, dynamically update the page's title.
     */
    useEffect(() =>{
        document.title = "Negative Carbon Reforestation Project - Maps";
    })


    return (
        <div className="map-container">
            {/*<SearchBar />*/}
            <Map center={fromLonLat(center)} zoom={zoom}>
                <Layers>
                    <Base/>
                    <LandCover/>
                    <Markers/>
                </Layers>
                <Overlays>
                    {/*<QueryMenu />*/}
                </Overlays>

                <Controls>
                    <LayerControl/>
                    <CameraControl/>
                </Controls>
            </Map>
        </div>
    )
};

export default App;
