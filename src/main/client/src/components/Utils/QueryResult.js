import React from "react";
import {toStringHDMS} from "ol/coordinate";

const QueryResult = ({data, coordinate}) => {

    const longLatInfo = toStringHDMS(coordinate);
    const longLatDisplay = `${String.fromCodePoint("0x1F4CD")} ${longLatInfo}`;

    const renderReforestationOpportunity = () => {
        if (typeof(data.wa_total_reforestation_opportunity) === "string")
        {
            return <p className="reforestation-score">Reforestation Opportunity: {data.wa_total_reforestation_opportunity}</p>
        }


        return <p className="reforestation-score">Reforestation Opportunity: {(data.wa_total_reforestation_opportunity * 100).toFixed(2)}%</p>;
    }

    const renderSpeciesTable = () => {
        if (typeof(data.species) === "object")
        {
            return (
                <>
                    <p className="species">Species: </p>
                    <table className="species-table">
                        <tbody>
                            <tr className="species-table-header">
                                <th className="species-type-header">Type</th>
                                <th className="species-density-header">Density</th>
                            </tr>
                            {
                                Object.entries(data.species).map(entry => <tr className="species-entry">
                                    <td className="species-type">{entry[0]}</td>
                                    <td className="species-density">{(entry[1] * 100).toFixed(2)}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </>
            )
        }
        else
        {
            return <p className="species">Species: {data.species}</p>
        }

    }

    return (
        <div className="query-content">
            <p className="coordinates">{longLatDisplay}</p>
            {renderReforestationOpportunity()}

            {renderSpeciesTable()}
        </div>
    );
}

export default QueryResult;