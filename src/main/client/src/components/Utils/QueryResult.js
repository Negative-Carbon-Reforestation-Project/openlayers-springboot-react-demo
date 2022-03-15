import React from "react";
import {toStringHDMS} from "ol/coordinate";

const QueryResult = ({data, coordinate}) => {

    const longLatInfo = toStringHDMS(coordinate);
    const longLatDisplay = `${String.fromCodePoint("0x1F4CD")} ${longLatInfo}`;

    const calculateReforestationOpportunity = () => {
        if (data.wa_total_reforestation_opportunity)
        {
            return (data.wa_total_reforestation_opportunity * 100).toFixed(2);
        }

        return 0;
    }

    return (
        <div className="query-content">
            <p className="coordinates">{longLatDisplay}</p>
            <p className="query-result">Reforestation Opportunity: {calculateReforestationOpportunity()}%</p>
        </div>
    );
}

export default QueryResult;