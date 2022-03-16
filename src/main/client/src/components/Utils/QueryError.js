import React from "react";
import errorIcon from "../../resources/images/error_icon-50x50.webp";

const QueryError = () => {
    return (
        <div className="query-error-content">
            <img className="query-error-icon" src={errorIcon} alt="error"/>
            <p className="query-error-message">Oops, there's been a technical issue.</p>
            <p className="query-error-message">Please contact us via GitHub</p>
        </div>
    );
}

export default QueryError;