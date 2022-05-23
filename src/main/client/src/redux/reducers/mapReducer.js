import {Feature, View} from "ol";
import {createSlice} from "@reduxjs/toolkit";
import {Point} from "ol/geom";
import {fromLonLat} from "ol/proj";
import {Icon, Style} from "ol/style";

/**
 * Initializes the openlayers map
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const addMapAction = (state, action) => {
    state.value.map = action.payload.map;
}

/**
 * Adds a layer onto the map
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const addMapLayerAction = (state, action) => {
    state.value.map.addLayer(action.payload.map);
}

/**
 * Sets the map view
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const setMapViewAction = (state, action) => {
    state.value.map.setView(new View({
        center: action.payload.center,
        zoom: action.payload.zoom ?? 6
    }));
}

/**
 * Toggles a layer's visibility on the map
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const toggleLayerVisibilityAction = (state, action) => {
    let layerIndex = Number(action.payload.layerIndex);
    let layers = state.value.map.getLayers();

    let isVisible = layers.item(layerIndex).getVisible();

    layers.item(layerIndex).setVisible(!isVisible);
}

/**
 * Toggles a base layer's visibility on the map
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 * @remark If other base layers are visibile, they will be toggled off.
 */
const toggleBaseLayerVisibilityAction = (state, action) => {
    let layerIndex = Number(action.payload.layerIndex);
    let layers = state.value.map.getLayers();

    for (let i = 0; i <= 4; i++)
    {
        layers.item(i).setVisible(false);
    }

    layers.item(layerIndex).setVisible(true);
}

/**
 * Removes a layer from the map
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const removeMapLayerAction = (state, action) => {
    state.value.map.removeLayer(action.payload.map);
}

/**
 * Initializes the cesium version of the openlayers map
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const addCesiumMapAction = (state, action) => {
    state.value.cesiumMap = action.payload.cesiumMap;
}

/**
 * Toggles cesium on/off
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const toggleCesiumEnabledAction = (state) => {
    let cesiumMap = state.value.cesiumMap;
    let cesiumEnabled = cesiumMap.getEnabled();

    state.value.cesiumMap.setEnabled(!cesiumEnabled);
    state.value.cesiumEnabled = !cesiumEnabled;
}

/**
 * Creates a marker at the given coordinates
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const addMarkerAction = (state, action) => {
    let markerLayer = state.value.map.getLayers().item(9);

    let newFeature = new Feature({
        geometry: new Point(action.payload.coordinates),
        coordinates: action.payload.coordinates,
    });

    markerLayer.getSource().addFeature(newFeature);

}

/**
 * Removes a given marker
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const removeMarkerAction = (state, action) => {
    let markerLayer = state.value.map.getLayers().item(9);
    markerLayer.getSource().removeFeature(action.payload.feature);
}

/**
 * Reducer configuration for the openlayers map and cesium map actions and events.
 */
const mapsSlice = createSlice({
    name: "maps",
    initialState: {
        value: {map: undefined, cesiumEnabled: false, cesiumMap: undefined}
    },
    reducers: {
        addMap: (state, action) => addMapAction(state, action),
        setMapView: (state, action) => setMapViewAction(state, action),
        addMapLayer: (state, action) => addMapLayerAction(state, action),
        removeMapLayer: (state, action) => removeMapLayerAction(state, action),
        addMarker: (state, action) => addMarkerAction(state, action),
        removeMarker: (state, action) => removeMarkerAction(state, action),
        toggleLayerVisibility: (state, action) => toggleLayerVisibilityAction(state, action),
        toggleBaseLayerVisibility: (state, action) => toggleBaseLayerVisibilityAction(state, action),
        addCesiumMap: (state, action) => addCesiumMapAction(state, action),
        toggleCesiumEnabled: (state) => toggleCesiumEnabledAction(state),
    }
});

export const {
    addMap,
    setMapView,
    addMapLayer,
    removeMapLayer,
    addMarker,
    removeMarker,
    toggleLayerVisibility,
    toggleBaseLayerVisibility,
    addCesiumMap,
    toggleCesiumEnabled
} = mapsSlice.actions;

export default mapsSlice.reducer;