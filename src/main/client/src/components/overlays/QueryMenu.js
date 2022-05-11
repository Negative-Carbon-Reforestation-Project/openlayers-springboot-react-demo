import useQuery from "./useQuery";
import exitIcon from "../../resources/images/icons/exit-icon-50x50.png";
import {useEffect, useRef} from "react";

/**
 * Container for the Query Menu
 * @returns {JSX.Element}
 */
const QueryMenu = () => {
    // useQuery contains the content of the query, usePopup was for the old popup (use as a reference if needed)
    const { toggleQueryMenu, queryData, queryState } = useQuery();
    const queryMenuRef = useRef();

    useEffect(() => {
        queryMenuRef.current.classList.toggle("active-flex");
    })
    /**
     * Toggles the menu display on and off
     */
    const toggleMenu = () => {
        queryMenuRef.current.classList.toggle("active-flex");
    }

    return (
        <>
            <section ref={queryMenuRef} className="query-menu topo-skin" aria-label="Query information">
                <img className="query-menu-exit" src={exitIcon} alt="Exit query menu" onClick={() => toggleMenu()}/>
            </section>
        </>

    )
}

export default QueryMenu;