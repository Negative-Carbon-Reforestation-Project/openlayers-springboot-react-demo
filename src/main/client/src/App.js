import React, { useState } from 'react';
import './App.css';

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

function App()
{
    const [center, setCenter] = useState([0, 0]);
    const [zoom, setZoom] = useState(2);

    return (
        <div>
            <Logo />

            <Map center={fromLonLat(center)} zoom={zoom}>
                <Layers>
                  <TileLayer source={new OSM()} zIndex={0} />
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
}

export default App;
