import hamburgerIcon from "../../resources/images/icons/hamburger-menu-50x50.webp";

/**
 * Container for the Search Bar
 * @returns {JSX.Element}
 * @constructor
 */
const SearchBar = () => {
    return (
        <>
            <nav class="search-nav">
                <img src={hamburgerIcon} alt="Open navigation menu icon"/>
                <input class="search-bar"
                       autoFocus={true}
                       type="search"
                       aria-label="Search location for reforestation opportunities"
                       placeholder="Search Location"
                />
            </nav>
        </>
    )
}

export default SearchBar;