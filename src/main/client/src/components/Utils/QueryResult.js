import React from "react";
import {toStringHDMS} from "ol/coordinate";
import {toLonLat} from "ol/proj";

const QueryResult = ({data, coordinate}) => {

    const longLatInfo = toStringHDMS(coordinate);
    const longLatDisplay = `${String.fromCodePoint("0x1F4CD")} ${longLatInfo}`;

    /**
     * Maps the OpenSearch index to its equivalent tree type
     * @param result The index result from OpenSearch
     * @returns {string}
     */
    const getTreeType = (result) => {
        switch (result)
        {
            case "wa_red_alder_stand_density":
                return "Red Alder"
            case "wa_douglas_fir_stand_density":
                return "Douglas Fir"
            case "wa_western_hemlock_stand_density":
                return "Western Hemlock"
            case "wa_pacific_yew_basal_area":
                return "Pacific Yew"
            default:
                return "Unknown"
        }
    }

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
                                data.species.map((entry) => Object.entries(entry).map((speciesEntry) =>
                                    <tr className="species-entry">
                                        <td className="species-type">{getTreeType(speciesEntry[0])}</td>
                                        <td className="species-density">{(speciesEntry[1] * 100).toFixed(2)}</td>
                                    </tr>)
                                )
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

    const renderQueryResultIssue = () => {

        let longLatInfo = toLonLat(coordinate);

        let labels = `bug`;
        let title = encodeURIComponent(`New bug: query coordinates`);
        let body = encodeURIComponent(``);
        let url = `https://github.com/Negative-Carbon-Reforestation-Project/openlayers-springboot-react-demo/issues/new?labels=${labels}&title=${title}&body=${body}`;
        return url;

    }

    return (
        <div className="query-content">
            <p className="coordinates">{longLatDisplay}</p>
            {renderReforestationOpportunity()}
            {renderSpeciesTable()}
            {/*{renderQueryResultIssue()}*/}
        </div>
    );
}

export default QueryResult;