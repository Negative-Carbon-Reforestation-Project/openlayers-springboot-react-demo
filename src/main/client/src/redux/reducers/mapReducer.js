const {createSlice} = require("@reduxjs/toolkit");

const addMapAction = (state, action) => {
    state.value.map = action.payload.map;
}

const addMapLayerAction = (state, action) => {
    state.value.map.addLayer(action.payload.map);
}

const removeMapLayerAction = (state, action) => {
    state.value.map.removeLayer(action.payload.map);
}

const addCesiumMapAction = (state, action) => {
    state.value.cesiumMap = action.payload.cesiumMap;
}

const setQueryableAction = (state, action) => {
    state.value.isQueryable = action.payload.isQueryable;
}

const mapsSlice = createSlice({
    name: "maps",
    initialState: {
        value: {map: undefined, isQueryable: false, cesiumMap: undefined}
    },
    reducers: {
        addMap: (state, action) => addMapAction(state, action),
        addMapLayer: (state, action) => addMapLayerAction(state, action),
        removeMapLayer: (state, action) => removeMapLayerAction(state, action),
        addCesiumMap: (state, action) => addCesiumMapAction(state, action),
        setQueryable: (state, action) => setQueryableAction(state, action)
    }
});

export const { addMap, addMapLayer, removeMapLayer, addCesiumMap, setQueryable } = mapsSlice.actions;
export default mapsSlice.reducer;