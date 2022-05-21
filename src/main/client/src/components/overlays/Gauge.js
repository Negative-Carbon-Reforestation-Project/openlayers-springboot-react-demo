import React from "react";
import GaugeChart from "react-gauge-chart";

const Gauge = ({ data }) => {
    // Colors are red, yellow, and green hex values borrowed from _variables.css
    const colors = ["#cc5e5d", "#ecb65a", "#127f2c"];

    // queryData.wa_total_reforestation_opportunity is passed into gauge from QueryMenu
    const percent = data / 100;

    const chartStyle = {
        height: 40,
    };

    return (
        <>
            <GaugeChart
                id="gauge-chart-reforestation"
                colors={colors}
                percent={percent}
                redraw={true}
                needleColor="#5d97cc"
                needleBaseColor="#5d97cc"
                style={chartStyle}
            />
        </>
    );
};
 
export default Gauge;