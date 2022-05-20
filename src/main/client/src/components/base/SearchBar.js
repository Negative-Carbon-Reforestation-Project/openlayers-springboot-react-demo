import hamburgerIcon from "../../resources/images/icons/hamburger-menu-50x50.webp";

/**
 * Container for the Search Bar
 * @returns {JSX.Element}
 * @constructor
 */
const SearchBar = () => {

    /**
     * Geocodes an address
     * @param event The event containing the address search input
     * @remark Documentation for ArcGIS Geocoding is available at https://developers.arcgis.com/documentation/mapping-apis-and-services/search/services/geocoding-service/
     */
    const geocodeAddress = (event) => {
        let address = event.target[1].value;
        console.log(address);

        fetch(`https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?address=${address}&maxLocations=1&f=json&token=${process.env.REACT_APP_ARCTOKEN}`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    return (
        <>
            <form role="search"
                  className="search-nav"
                  tabIndex={0}
                  onSubmit={event => {
                      event.preventDefault();
                      geocodeAddress(event);
                  }}
              >
                <button className="menu-button" aria-label="Toggle navigation menu">
                    <img className="menu-icon" src={hamburgerIcon} alt="Navigation menu icon"/>
                </button>

                <input className="search-bar"
                       autoFocus={true}
                       type="search"
                       aria-label="Search addresses for reforestation opportunities"
                       placeholder="Search Location"
                />
            </form>
        </>
    )
}

export default SearchBar;