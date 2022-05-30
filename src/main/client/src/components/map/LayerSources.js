import {BingMaps, OSM, Stamen, TileWMS, XYZ} from "ol/source";

const osm = new OSM();

const aerial = new BingMaps({key: process.env.REACT_APP_BINGTOKEN, imagerySet: "AerialWithLabelsOnDemand"});

const toner = new Stamen({layer: "toner"});

const topographical = new XYZ({url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png"});

const terrain = new Stamen({layer: "terrain"});

const soil = new TileWMS({
    url: 'https://geo.ncrp.app/geoserver/wms',
    params: {'LAYERS': 'ncrp:soil-data', 'TILED': true},
    serverType: 'geoserver',
    transition: 0,
});

const slope = new TileWMS({
    url: 'https://geo.ncrp.app/geoserver/wms',
    params: {'LAYERS': 'ncrp:wa_slope', 'TILED': true},
    serverType: 'geoserver',
    transition: 0,
});

const wildfires = new TileWMS({
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
});

export {
    osm,
    aerial,
    toner,
    topographical,
    terrain,
    soil,
    slope,
    wildfires,
    totalOpportunity
};

