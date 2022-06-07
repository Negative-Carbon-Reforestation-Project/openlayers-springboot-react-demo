import Coordinates from "./Coordinates";
import exitIcon from "../../resources/images/icons/exit-icon-50x50.png";
import Gauge from "./Gauge";
import PieChart from "./PieChart";
import React from "react";

const QueryResult = ({data}) => {

    /**
     * Generates a descriptive statement for the reforestation opportunity percentage
     * @param percent The reforestation opportunity percent
     * @returns {string} A descriptive statement for the percent
     */
    const reforestationPercentToString = (percent) => {
        let explanation = "";

        if (percent > 67)
        {
            explanation =
                "This area is highly reforestable! Go plant some trees! The common species within this area are show in the chart to the right.";

        } else if (33 < percent && percent < 67)
        {
            explanation =
                "This area has medium reforestation opportunity.\nThis area may have substantial tree cover and/or other structures.";
        } else
        {
            explanation =
                "This area has low reforestation opportunity.\nIt is recommended that you focus on areas with high reforestation opportunity.";
        }

        return explanation;
    };


    return (
        <>
            <section className="query-result-header">
                <Coordinates className="query-result-coordinates" coordinates={data.coordinates} />
            </section>

            <section className="chart-container">
                <section className="gauge-container">
                    <p className="chart-title">OPPORTUNITY FOR REFORESTATION</p>
                    <hr className="chart-title-divider"/>
                    {/*<Gauge chartID={"gauge-chart"} data={data.wa_total_reforestation_opportunity}/>*/}
                    <p className="gauge-data-explanation">
                        {reforestationPercentToString(data.wa_total_reforestation_opportunity)}
                    </p>
                </section>

                <section className="pie-container">
                    <p className="chart-title">TREE SPECIES</p>
                    <hr className="chart-title-divider"/>
                    <PieChart data={data.species} />
                </section>
            </section>
        </>
    )
}

export default QueryResult;