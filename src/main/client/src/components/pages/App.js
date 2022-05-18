import React, {useEffect, useState} from 'react';

import Map from "../map/Map";
import Layers from "../layers/Layers";
import TileLayer from "../layers/TileLayer";
import Controls from "../controls/Controls";

import { OSM, BingMaps, Stamen, XYZ, TileWMS } from "ol/source";
import { fromLonLat } from "ol/proj";
import Overlays from "../overlays/Overlays";
import Popup from "../overlays/Popup";
import SideMenu from "../base/SideMenu";
import SearchBar from "../base/SearchBar";
import QueryMenu from "../overlays/QueryMenu";
import LayerControl from "../controls/LayerControl";
import CameraControl from "../controls/CameraControl";

/**
 * Component for the React applicaation
 * @returns {JSX.Element}
 */
const App = () => {
    const washingtonCoordinates = [-122.29567670312974, 47.41311574557329];
    const [center, setCenter] = useState(washingtonCoordinates);
    const [zoom, setZoom] = useState(6);

    const soilData = new TileWMS({
        url: 'https://geo.ncrp.app/geoserver/wms',
        params: {'LAYERS': 'ncrp:soil-data', 'TILED': true},
        serverType: 'geoserver',
        transition: 0,
    });

    const waSlope = new TileWMS({
        url: 'https://geo.ncrp.app/geoserver/wms',
        params: {'LAYERS': 'ncrp:wa_slope', 'TILED': true},
        serverType: 'geoserver',
        transition: 0,
    });

    const waFire = new TileWMS({
        url: 'https://geo.ncrp.app/geoserver/wms',
        params: {'LAYERS': 'ncrp:wa_fire_history_low_dpi', 'TILED': true},
        serverType: 'geoserver',
        transition: 0,
    });

    const totalOpportunity = new TileWMS({
        url: 'https://geo.ncrp.app/geoserver/wms',
        params: {'LAYERS': 'ncrp:wa-total-opportunity', 'TILED': true},
        serverType: 'geoserver',
        transition: 0,
    })


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
                    <TileLayer source={new OSM()} zIndex={0} visible={true} />
                    <TileLayer source={new BingMaps({key: "AjfTsiozBjJlt3OV1PIbHuGRaaUEtnvKXwc1qEpyAFLi_LLImirWTbks68MZ87Ve", imagerySet: "AerialWithLabelsOnDemand"})} zIndex={0} preload={Infinity}/>
                    <TileLayer source={new Stamen({layer: "toner"})} zIndex={0}/>
                    <TileLayer source={new XYZ({url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png"})} zIndex={0} preload={Infinity}/>
                    <TileLayer source={new Stamen({layer: "terrain"})} zIndex={0}/>

                    <TileLayer source={waSlope} zIndex={1} opacity={.6}/>
                    <TileLayer source={waFire} zIndex={2} opacity={.3}/>
                    <TileLayer source={soilData} zIndex={3}/>
                    <TileLayer source={totalOpportunity} zIndex={4}/>
                </Layers>
                <Overlays>
                    {/*<Popup />*/}
                    {/*<QueryMenu />*/}
                </Overlays>
                <SideMenu>
                    {/*<Controls/>*/}
                    <LayerControl/>
                    <CameraControl/>
                </SideMenu>
            </Map>
        </div>
    )
};

export default App;
