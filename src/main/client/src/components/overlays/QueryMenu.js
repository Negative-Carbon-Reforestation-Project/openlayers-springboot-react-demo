import useQuery from "./useQuery";
import exitIcon from "../../resources/images/icons/exit-icon-50x50.png";
import { useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import Piechart from "./Piechart";
import Coordinates from "./Coordinates";
import Gauge from "./Gauge";

/**
 * Container for the Query Menu
 * @returns {JSX.Element}
 */
const QueryMenu = () => {
    // useQuery contains the content of the query, usePopup was for the old popup (use as a reference if needed)
    // queryData is a json object which is populated by useQuery on click
    const { toggleQueryMenu, queryData, queryState } = useQuery();
    const queryMenuRef = useRef();

    // use -> hook
    // Simulating a component
    useEffect(() => {
        // debugger;
        // console.log(queryData)
        queryMenuRef.current.classList.toggle("active-flex");
    });

    /**
     * Toggles the menu display on and off
     */
    const toggleMenu = () => {
        // debugger;
        queryMenuRef.current.classList.toggle("active-flex");
    };

    // TODO
    // Add logic to print a paragraph under reforestation gauge
    // to explain the percentage based on queryData.wa_total_reforestation_opportunity

    // const percent = queryData.wa_total_reforestation_opportunity;

    const reforestationExpl = (percent) => {
        var explanation = "";
        if (percent > 67) {
            explanation =
                "This area is highly reforestable! Go plant some trees! The common species within this area are show in the chart to the right.";
        } else if (33 < percent && percent < 67) {
            explanation =
                "This area has medium reforestation opportunity.\nThis area may have substantial tree cover and/or other structures.";
        } else {
            explanation =
                "This area has low reforestation opportunity.\nIt is recommended that you focus on areas with high reforestation opportunity.";
        }
        return explanation;
    };

    // debugger;

    console.log(queryData.wa_total_reforestation_opportunity);

    return (
        <>
            <section
                ref={queryMenuRef}
                className="query-menu topo-skin"
                aria-label="Query information"
            >
                <section className="query-coordinate-exit-container">
                    <img
                        className="query-menu-exit"
                        src={exitIcon}
                        alt="Exit query menu"
                        onClick={() => toggleMenu()}
                    />
                    <section className="query-menu-coordinates">
                        <Coordinates coordinates={queryData.coordinates} />
                    </section>
                    <div></div>
                </section>
                {/* <p>{console.log(queryData)}</p> */}
                <section className="chart-container">
                    {/* <div></div> */}
                    <section className="gauge-container">
                        <p className="chart-title">
                            OPPORTUNITY FOR REFORESTATION
                        </p>
                        <Gauge
                            data={queryData.wa_total_reforestation_opportunity}
                        />
                        <p className="chart-reforest-expl">
                            {reforestationExpl(
                                queryData.wa_total_reforestation_opportunity
                            )}
                        </p>
                    </section>
                    {/* <div></div> */}
                    <section className="pie-container">
                        <p className="chart-title">TREE SPECIES</p>
                        <Piechart data={queryData.species} />
                    </section>
                    {/* <div></div> */}
                </section>
            </section>
        </>
    );
};

export default QueryMenu;
