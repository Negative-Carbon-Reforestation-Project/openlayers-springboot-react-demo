import {createSlice} from "@reduxjs/toolkit";
import {getCookie} from "../../components/utils/CookieManager";

/**
 * Decide whether to show the tutorial
 * @returns {boolean} True if the tutorial hasn't been shown before; False otherwise
 */
const showTutorial = () => {
    let tutorialCookie = getCookie("onboarded");

    if (!tutorialCookie)
    {
        return true;
    }

    return tutorialCookie === false;
}

/**
 * Toggles the guided tutorial
 * @param state The current state of the reducer
 * @param action The object containing information about the new state
 */
const toggleTutorialAction = (state, action) => {
    state.value.tutorialEnabled = action.payload.tutorialEnabled;
}

/**
 * Reducer configuration for the openlayers map and cesium map actions and events.
 */
const appSlice = createSlice({
    name: "app",
    initialState: {
        // value: {tutorialEnabled: showTutorial()}
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