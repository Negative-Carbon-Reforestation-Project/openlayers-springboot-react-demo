import React from "react";
import {toStringHDMS} from "ol/coordinate";
import {toLonLat} from "ol/proj";
import pinIcon from "../../resources/images/icons/icons8-location-48.png"

const Coordinates = (Coordinates) => {
	const longLatInfo = toStringHDMS(Coordinates);
    const longLatDisplay = `${String.fromCodePoint("0x1F4CD")} ${longLatInfo}`;

	return (
		<section>
			<p className="query-menu-coordinates">{longLatDisplay}</p>
		</section>
	);
};

export default Coordinates;