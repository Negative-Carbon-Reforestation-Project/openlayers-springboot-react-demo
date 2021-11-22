import React, { useState } from 'react';
import './App.css';

import Map from "./components/Map/Map";
import Layers from "./components/Layers/Layers";
import TileLayer from "./components/Layers/TileLayer";
import Controls from "./components/Controls/Controls";

import { OSM } from "ol/source";
import { fromLonLat, get } from "ol/proj";

function App()
{
    const [center, setCenter] = useState([0, 0]);
    const [zoom, setZoom] = useState(2);

    return (
        <div>
          <Map center={fromLonLat(center)} zoom={zoom}>
            <Layers>
              <TileLayer source={new OSM()} zIndex={0} />
            </Layers>
            <Controls>

            </Controls>
          </Map>
        </div>
    )
}

export default App;
