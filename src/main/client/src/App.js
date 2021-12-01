import React, { useState } from 'react';
import './styles/App.css';

import Map from "./components/Map/Map";
import Layers from "./components/Layers/Layers";
import TileLayer from "./components/Layers/TileLayer";
import Controls from "./components/Controls/Controls";
import ZoomControl from "./components/Controls/Zoom";
import Logo from "./components/Logo";
import Footer from "./components/Footer";

import { OSM, TileWMS } from "ol/source";
import { fromLonLat } from "ol/proj";
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

    const waSlope = new TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {'LAYERS': 'ncrp:wa_slope', 'TILED': true},
        serverType: 'geoserver',
        transition: 0,
    });

    const waFire = new TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {'LAYERS': 'ncrp:wa_fire_history_low_dpi', 'TILED': true},
        serverType: 'geoserver',
        transition: 0,
    });

    const soilClasses = new TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {'LAYERS': 'ncrp:soil_classes', 'TILED': true},
        serverType: 'geoserver',
        transition: 0,
    })

    return (
        <div>
            <Logo />

            <Map center={fromLonLat(center)} zoom={zoom}>
                <Layers>
                    <TileLayer source={new OSM()} zIndex={0} preload={Infinity} />
                    <TileLayer source={waSlope} zIndex={1} opacity={.6}/>
                    <TileLayer source={waFire} zIndex={2} opacity={.3}/>
                    <TileLayer source={soilClasses} zIndex={3}/>
                </Layers>
                <Overlays>
                    <Popup />
                </Overlays>
                <Controls>
                    <ZoomControl />
                </Controls>
            </Map>

            <Footer>
                <p className="footer__copyright-info">© NCRP Contributors</p>
            </Footer>
        </div>
    )
};

export default App;
