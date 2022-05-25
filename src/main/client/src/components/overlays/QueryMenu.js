import React from "react";
import useQuery from "./useQuery";

/**
 * Container for the Query Menu
 * @returns {JSX.Element}
 */
const QueryMenu = React.forwardRef(({coordinates}, queryMenuRef) => {

    const { queryContent } = useQuery(coordinates, queryMenuRef);

    return (
        <>
            <section
                ref={queryMenuRef}
                className="query-menu topo-skin"
                aria-label="Query information"
            >
                {queryContent}
            </section>
        </>
    );
})

export default QueryMenu;
