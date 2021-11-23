import React, { useState } from 'react';
import './styles/App.css';

import Map from "./components/Map/Map";
import Layers from "./components/Layers/Layers";
import TileLayer from "./components/Layers/TileLayer";
import Controls from "./components/Controls/Controls";
import ZoomControl from "./components/Controls/Zoom";
import Logo from "./components/Logo";
import Footer from "./components/Footer";

import { OSM } from "ol/source";
import { fromLonLat, get } from "ol/proj";
import Overlays from "./components/Overlays/Overlays";
import Popup from "./components/Overlays/Popup";

/**
 * Component for the React applicaation
 * @returns {JSX.Element}
 */
const App = () => {
    const washingtonCoordinates = [-122.29567670312974, 47.41311574557329];
    const [center, setCenter] = useState(washingtonCoordinates);
    const [zoom, setZoom] = useState(6);

    return (
        <div>
            <Logo />

            <Map center={fromLonLat(center)} zoom={zoom}>
                <Layers>
                  <TileLayer source={new OSM()} zIndex={0} preload={Infinity} />
                </Layers>
                <Overlays>
                    <Popup />
                </Overlays>
                <Controls>
                    <ZoomControl />
                </Controls>
            </Map>

            <Footer>
                <p className="copyright-info">© NCRP Contributors</p>
            </Footer>
        </div>
    )
};

export default App;
