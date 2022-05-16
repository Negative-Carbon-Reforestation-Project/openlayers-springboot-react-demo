const {createSlice} = require("@reduxjs/toolkit");

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
 * Toggles a layer's visibility on the map
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 * @remark If a visibility is carried in the payload, use it otherwise toggle it.
 */
const toggleLayerVisibilityAction = (state, action) => {
    let layerIndex = Number(action.payload.layerIndex);
    let layers = state.value.map.getLayers();

    let isVisible = action.payload.visibility ??
                    layers.item(layerIndex).getVisible();

    layers.item(layerIndex).setVisible(!isVisible);
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
 * Toggles the ability to query the map
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const setQueryableAction = (state, action) => {
    state.value.isQueryable = action.payload.isQueryable;
}

/**
 * Reducer configuration for the openlayers map and cesium map actions and events.
 */
const mapsSlice = createSlice({
    name: "maps",
    initialState: {
        value: {map: undefined, isQueryable: false, cesiumMap: undefined}
    },
    reducers: {
        addMap: (state, action) => addMapAction(state, action),
        addMapLayer: (state, action) => addMapLayerAction(state, action),
        toggleLayerVisibility: (state, action) => toggleLayerVisibilityAction(state, action),
        removeMapLayer: (state, action) => removeMapLayerAction(state, action),
        addCesiumMap: (state, action) => addCesiumMapAction(state, action),
        setQueryable: (state, action) => setQueryableAction(state, action)
    }
});

export const {
    addMap,
    addMapLayer,
    toggleLayerVisibility,
    removeMapLayer,
    addCesiumMap,
    setQueryable
} = mapsSlice.actions;

export default mapsSlice.reducer;