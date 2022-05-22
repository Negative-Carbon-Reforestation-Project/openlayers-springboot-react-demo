import {Steps} from "intro.js-react";
import {useSelector} from "react-redux";

/**
 * Container for Tutorial
 * @returns {JSX.Element}
 * @constructor
 */

const Tutorial = () => {

    const tutorialEnabled = useSelector((state) => state.app.value.tutorialEnabled);
    const steps = [
        {
            intro: "Welcome to our app"
        }
    ]
    return (
        <>
            <Steps
                enabled={enabled}
                steps={steps}
                initialStep={initialStep}
                onExit={onExit}
            />
        </>
    )
}

export default Tutorial;