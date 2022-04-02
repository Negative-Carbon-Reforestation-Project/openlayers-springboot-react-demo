import React, {useContext, useState} from 'react';
import "../../styles/main.css";

import Map from "../Map/Map";
import Layers from "../Layers/Layers";
import TileLayer from "../Layers/TileLayer";
import Controls from "../Controls/Controls";
import Logo from "../Base/Logo";
import Footer from "../Base/Footer";

import { OSM, BingMaps, Stamen, XYZ, TileWMS } from "ol/source";
import { fromLonLat } from "ol/proj";
import Overlays from "../Overlays/Overlays";
import Popup from "../Overlays/Popup";
import SideMenu from "../Base/SideMenu";

/**
 * Component for the React applicaation
 * @returns {JSX.Element}
 */
const App = () => {
    const washingtonCoordinates = [-122.29567670312974, 47.41311574557329];
    const [center, setCenter] = useState(washingtonCoordinates);
    const [zoom, setZoom] = useState(6);

    const soilData = new TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {'LAYERS': 'ncrp:soil-data', 'TILED': true},
        serverType: 'geoserver',
        transition: 0,
    });

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

    const totalOpportunity = new TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {'LAYERS': 'ncrp:wa-total-opportunity', 'TILED': true},
        serverType: 'geoserver',
        transition: 0,
    })



    return (
        <div className={"container"}>
            <Logo className="app-logo" />
            <Map center={fromLonLat(center)} zoom={zoom}>
                <Layers>
                    <TileLayer source={new OSM()} zIndex={0} visible={true} />
                    <TileLayer source={new Stamen({layer: "terrain"})} zIndex={0}/>
                    <TileLayer source={new Stamen({layer: "toner"})} zIndex={0}/>
                    <TileLayer source={new BingMaps({key: "AjfTsiozBjJlt3OV1PIbHuGRaaUEtnvKXwc1qEpyAFLi_LLImirWTbks68MZ87Ve", imagerySet: "AerialWithLabelsOnDemand"})} zIndex={0} preload={Infinity}/>
                    <TileLayer source={new XYZ({url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png"})} zIndex={0} preload={Infinity}/>

                    <TileLayer source={waSlope} zIndex={1} opacity={.6}/>
                    <TileLayer source={waFire} zIndex={2} opacity={.3}/>
                    <TileLayer source={soilData} zIndex={3}/>
                    <TileLayer source={totalOpportunity} zIndex={4}/>
                </Layers>
                <Overlays>
                    <Popup />
                </Overlays>
                <SideMenu>
                    <Controls/>
                </SideMenu>
            </Map>
            {/*<Footer/>*/}
        </div>
    )
};

export default App;
