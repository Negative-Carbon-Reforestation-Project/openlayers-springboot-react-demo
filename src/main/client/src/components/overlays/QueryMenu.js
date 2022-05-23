import useQuery from "./useQuery";
import exitIcon from "../../resources/images/icons/exit-icon-50x50.png";
import { useEffect, useRef } from "react";
import Piechart from "./Piechart";
import Coordinates from "./Coordinates";
import Gauge from "./Gauge";

/**
 * Container for the Query Menu
 * @returns {JSX.Element}
 */
const QueryMenu = () => {
    const { queryData, toggleQueryMenu, setToggleQueryMenu } = useQuery();
    const queryMenuRef = useRef();

    /**
     * Shows the query menu
     */
    const showMenu = () => {
        console.log("Inside show menu -QueryMenu");
        if (toggleQueryMenu)
        {
            queryMenuRef.current.classList.add("active-flex");
        }
    }

    /**
     * Hides the query menu
     */
    const hideMenu = () => {
            queryMenuRef.current.classList.remove("active-flex");
            setToggleQueryMenu(false);
    }

    /**
     * Generates a descriptive statement for the reforestation opportunity percentage
     * @param percent The reforestation opportunity percent
     * @returns {string} A descriptive statement for the percent
     */
    const reforestationPercentToString = (percent) => {
        var explanation = "";

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

    /**
     * Once the component is mounted onto the DOM, display the query menu
     */
    useEffect(() => {
        showMenu();
    });

    return (
        <>
            <section
                ref={queryMenuRef}
                className="query-menu topo-skin"
                aria-label="Query information"
            >
                <section className="query-menu-header">
                    <Coordinates className="query-menu-coordinates" coordinates={queryData.coordinates} />

                    <img
                        className="query-menu-exit"
                        src={exitIcon}
                        alt="Exit query menu"
                        onClick={() => hideMenu()}
                    />
                </section>

                <section className="chart-container">
                    <section className="gauge-container">
                        <p className="chart-title">OPPORTUNITY FOR REFORESTATION</p>
                        <Gauge data={queryData.wa_total_reforestation_opportunity}/>
                        <p className="chart-reforest-expl">
                            {reforestationPercentToString(queryData.wa_total_reforestation_opportunity)}
                        </p>
                    </section>

                    <section className="pie-container">
                        <p className="chart-title">TREE SPECIES</p>
                        <Piechart data={queryData.species} />
                    </section>
                </section>
            </section>
        </>
    );
};

export default QueryMenu;
