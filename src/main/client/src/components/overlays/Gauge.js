import React from "react";
import GaugeChart from "react-gauge-chart";

/**
 * Container for the Guage Chart
 * @param reforestationOpportunity The reforestation opportunity for the given coordinate
 * @returns {JSX.Element}
 */
const Gauge = ({ data:reforestationOpportunity }) => {
    // Colors are red, yellow, and green hex values borrowed from _variables.css
    const colors = [
        "#cc5e5d", // Red
        "#ecb65a", // Yellow
        "#127f2c" // Green
    ];

    const percent = reforestationOpportunity / 100;

    const chartStyle = {
        height: 40,
    };

    return <GaugeChart
                id="gauge-chart-reforestation"
                colors={colors}
                percent={percent}
                redraw={true}
                needleColor="#5d97cc"
                needleBaseColor="#5d97cc"
                style={chartStyle}
            />;
};
 
export default Gauge;