import React from "react";
import errorIcon from "../../resources/images/icons/error_icon-50x50.webp";

const QueryError = ({error}) => {

    /**
     * Creates an GitHub issue link with the given error
     * @returns {string}
     */
    const getIssueLink = () => {
        let labels = `bug`;
        let title = encodeURIComponent(`New bug: ${error.message}`);
        let body = encodeURIComponent(error.stack);
        let url = `https://github.com/Negative-Carbon-Reforestation-Project/openlayers-springboot-react-demo/issues/new?labels=${labels}&title=${title}&body=${body}`;
        return url;
    }

    return (
        <div className="query-error-content">
            <img className="query-error-icon" src={errorIcon} alt="error"/>
            <p className="query-error-message">Oops, there's been a technical issue.</p>
            <p className="query-error-message">Please contact us via GitHub</p>
        </div>
    );
}

export default QueryError;