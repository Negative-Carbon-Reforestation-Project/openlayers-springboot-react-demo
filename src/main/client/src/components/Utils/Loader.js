import React from "react";
import bob from "../../resources/images/icons/bob-ross-178x120.webp";

/**
 * Container for Loader
 * @returns {JSX.Element}
 */
const Loader = () => {

    return <div className="bob-loader">
        <img className="loader-icon" src={bob} alt=""/>
    </div>;
}

export default Loader;