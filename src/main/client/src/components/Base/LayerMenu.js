import React, {useContext, useEffect, useRef} from "react";
import SideMenuContext from "./SideMenuContext";
import {useSelector} from "react-redux";

/**
 * Container for layer menu
 *
 * TO-DO: Implement after new prototype has been finalized.
 */
const LayerMenu = () => {
    const {sideMenuRef, layerMenuRef} = useContext(SideMenuContext);
    const map = useSelector((state) => state.maps.value.map);

    const osmLayerToggleRef = useRef();
    const baseGroupRef = useRef();
    const landGroupRef = useRef();

    /**
     * Once the component is mounted onto the DOM, toggle the OSM layer by default.
     */
    useEffect(() => {
        osmLayerToggleRef.current.checked = true;
    }, []);

    /**
     * Hides the side menu
     */
    const hideSideMenu = () => {
        sideMenuRef.current.classList.toggle("active");
        layerMenuRef.current.classList.toggle("active");
    };

    /**
     * Toggles a layer group container
     * @param groupRef The reference to the group's container
     */
    const toggleGroup = (groupRef) => {
        groupRef.current.classList.toggle("active");
    }

    /**
     * Toggles a layer's visibility
     * @param event The click event
     */
    const toggleLayer = (event) => {
        let layerIndex = Number(event.target.value);
        let layers = map.getLayers();

        layers.item(layerIndex).setVisible(event.target.checked);

    }

    /**
     * Toggles the base layer visibility
     * @remark Only one base layer can be active, so disabling other base layers is required.
     * @param event The click event
     */
    const toggleBaseLayer = (event) => {
        let layerIndex = Number(event.target.value);
        let layers = map.getLayers();

        for (let i = 0; i <= 4; i++)
        {
            layers.item(i).setVisible(false);
        }

        layers.item(layerIndex).setVisible(true);
    }

    return (
        <div ref={layerMenuRef} className="layer-menu" tabIndex={0} aria-label="Layer menu" role="menu">
            <section className="layer-menu-header">
                <h2 className="layer-menu-heading">Layers</h2>
                <button className="layer-menu-exit" onClick={() => hideSideMenu()} aria-label="Exit Layer Menu">X</button>
            </section>

            {/*<LayerManager className="layer-menu-content"/>*/}
            <section className="layer-menu-content">
                <section className="layer-group">
                    <button className="layer-group-heading" onClick={() => toggleGroup(baseGroupRef)} aria-label="Show Base Layer Options">Base</button>
                    <section ref={baseGroupRef} className="layer-group-content">
                        <article className="layer-item" role="radiogroup" tabIndex={0} aria-label="Pick a base layer">
                            <label htmlFor="OpenStreetMaps" className="layer-item-heading">
                                <input id="OpenStreetMaps" ref={osmLayerToggleRef} className="layer-item-toggle" type="radio" name="base" value={0} onClick={(event) => toggleBaseLayer(event)}/>
                                OpenStreetMaps
                            </label>

                            <label htmlFor="Terrain" className="layer-item-heading">
                                <input id="Terrain" className="layer-item-toggle" type="radio" name="base" value={1} onClick={(event) => toggleBaseLayer(event)}/>
                                Terrain
                            </label>

                            <label htmlFor="Toner" className="layer-item-heading">
                                <input id="Toner" className="layer-item-toggle" type="radio" name="base" value={2} onClick={(event) => toggleBaseLayer(event)}/>
                                Toner
                            </label>

                            <label htmlFor="Bing Maps" className="layer-item-heading">
                                <input id="Bing Maps" className="layer-item-toggle" type="radio" name="base" value={3} onClick={(event) => toggleBaseLayer(event)}/>
                                Bing Maps
                            </label>

                            <label htmlFor="OpenTopo" className="layer-item-heading">
                                <input id="OpenTopo" className="layer-item-toggle" type="radio" name="base" value={4} onClick={(event) => toggleBaseLayer(event)}/>
                                OpenTopo
                            </label>
                        </article>
                    </section>
                </section>

                <section className="layer-group">
                    <button className="layer-group-heading" onClick={() => toggleGroup(landGroupRef)} aria-label="Show Land Cover Layer Options">Land Cover</button>
                    <section ref={landGroupRef} className="layer-group-content">
                        <article className="layer-item" tabIndex={0} aria-label="Select landcover layers">
                            <label htmlFor="slopes" className="layer-item-heading">
                                <input id="slopes" className="layer-item-toggle" type="checkbox" name="landcover" value={5} onClick={(event) => toggleLayer(event)}/>
                                Slopes
                            </label>

                            <label htmlFor="fire-history" className="layer-item-heading">
                                <input id="fire-history" className="layer-item-toggle" type="checkbox" name="landcover" value={6} onClick={(event) => toggleLayer(event)}/>
                                Fire History
                            </label>

                            <label htmlFor="soil-data" className="layer-item-heading">
                                <input id="soil-data" className="layer-item-toggle" type="checkbox" name="landcover" value={7} onClick={(event) => toggleLayer(event)}/>
                                Soil Data
                            </label>

                            <label htmlFor="reforestation-opportunity" className="layer-item-heading">
                                <input id="reforestation-opportunity" className="layer-item-toggle" type="checkbox" name="landcover" value={8} onClick={(event) => toggleLayer(event)}/>
                                Reforestation Opportunity
                            </label>
                        </article>
                    </section>
                </section>
            </section>
        </div>
    )
}

export default LayerMenu;