import {createSlice} from "@reduxjs/toolkit";

/**
 * Toggles the guided tutorial
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const toggleTutorialAction = (state, action) => {
    state.value.app.tutorialEnabled = action.payload.tutorialEnabled;
}

/**
 * Reducer configuration for the openlayers map and cesium map actions and events.
 */
const appSlice = createSlice({
    name: "app",
    initialState: {
        value: {tutorialEnabled: false}
    },
    reducers: {
        toggleTutorial: (state, action) => toggleTutorialAction(state, action),
    }
});

export const {
    toggleTutorial
} = appSlice.actions;

export default appSlice.reducer;