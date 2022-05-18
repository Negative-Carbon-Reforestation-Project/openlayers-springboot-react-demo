import useQuery from "./useQuery";
import exitIcon from "../../resources/images/icons/exit-icon-50x50.png";
import { useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import Piechart from "./Piechart";
import Coordinates from "./Coordinates";

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
    console.log(queryData)
    queryMenuRef.current.classList.toggle("active-flex");
  });

  /**
   * Toggles the menu display on and off
   */
  const toggleMenu = () => {
    // debugger;
    queryMenuRef.current.classList.toggle("active-flex");
  };

  return (
    <>
      <section
        ref={queryMenuRef}
        className="query-menu topo-skin"
        aria-label="Query information"
      >
        <img
          className="query-menu-exit"
          src={exitIcon}
          alt="Exit query menu"
          onClick={() => toggleMenu()}
        />
        {/* <p>{console.log(queryData)}</p> */}
        <section>
            <Coordinates
                className="query-menu-coordinates"
                coordinates={queryData.Coordinates}
            />
        </section>
        <section>
          <Piechart className="active-flex-column"
                    data = {queryData.species}
          />
        </section>
      </section>
    </>
  );
};

export default QueryMenu;
