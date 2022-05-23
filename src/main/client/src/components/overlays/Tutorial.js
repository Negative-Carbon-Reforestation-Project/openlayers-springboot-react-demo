import {Steps, Hints} from "intro.js-react";
import {useDispatch, useSelector} from "react-redux";
import {toggleTutorial} from "../../redux/reducers/appReducer";

/**
 * Container for Tutorial
 * @returns {JSX.Element}
 * @constructor
 */

const Tutorial = () => {

    const tutorialEnabled = useSelector((state) => state.app.value.tutorialEnabled);
    const dispatch = useDispatch();

    const steps = [
        {
            intro: "Welcome to our app, let's take a tour",
            tooltipClass: "tutorial-container"

        },
        {
            intro: "Clicking on our map will search that location for reforestation opportunities. Try giving it a go!",
            tooltipClass: "tutorial-container"
        }
    ]

    /**
     * Exit the tutorial
     */
    const exitTutorial = () => {
        dispatch(toggleTutorial({tutorialEnabled: false}));
    }

    return (
        <>
            <Steps
                enabled={tutorialEnabled}
                steps={steps}
                initialStep={0}
                onExit={() => exitTutorial()}
            />
        </>
    )
}

export default Tutorial;