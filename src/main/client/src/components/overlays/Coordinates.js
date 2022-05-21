import React from "react";
import {toStringHDMS} from "ol/coordinate";
import {toLonLat} from "ol/proj";
import pinIcon from "../../resources/images/icons/icons8-location-48.png"

const Coordinates = ({coordinates}) => {
	const longLatInfo = toStringHDMS(coordinates);
    const longLatDisplay = `${String.fromCodePoint("0x1F4CD")} ${longLatInfo}`;

	// console.log(coordinates);
	// console.log(longLatDisplay);
	// console.log(longLatInfo);

	return (
		<section>
			<p className="query-menu-coordinates">{longLatDisplay}</p>
		</section>
	);
};

export default Coordinates;