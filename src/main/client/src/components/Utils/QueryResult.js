import React from "react";
import {toStringHDMS} from "ol/coordinate";

const QueryResult = ({data, coordinate}) => {

    const longLatInfo = toStringHDMS(coordinate);
    const longLatDisplay = `${String.fromCodePoint("0x1F4CD")} ${longLatInfo}`;

    return (
        <div className="query-content">
            <p className="coordinates">{longLatDisplay}</p>
            <p className="query-result">{data}</p>
        </div>
    );
}

export default QueryResult;