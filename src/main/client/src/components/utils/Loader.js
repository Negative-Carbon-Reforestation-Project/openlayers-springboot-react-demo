import React from "react";
import bob from "../../resources/images/icons/bob-ross-178x120.webp";
import bobFallback from "../../resources/images/icons/bob-ross-178x120.png";

/**
 * Container for Loader
 * @returns {JSX.Element}
 */
const Loader = () => {

    return <div className="bob-loader">
        <picture>
            <source type="image/webp"
                    srcSet={`${bob}`}
            />

            <img className="loader-icon" src={bobFallback} alt="Loading icon" loading="lazy"/>
        </picture>
    </div>;
}

export default Loader;