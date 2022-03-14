import React, {useContext, useEffect, useRef} from "react";
import {Drawer} from "@mui/material";
import SideMenuContext from "./SideMenuContext";
import MapContext from "../Map/MapContext";
import LayerManager from "../Utils/LayerManager";

/**
 * Container for layer menu
 */
const LayerMenu = () => {
    const {sideMenuRef, layerMenuRef} = useContext(SideMenuContext);
    const {map} = useContext(MapContext);
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
        layerMenuRef.current.style.display = "none";
        sideMenuRef.current.style.display = "none";
    };

    /**
     * Toggles a layer group container
     * @param groupRef The reference to the group's container
     */
    const toggleGroup = (groupRef) => {
        let isActive = groupRef.current.style.display === "block";

        groupRef.current.style.display = isActive ? "none" : "block";
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
        <div ref={layerMenuRef} className="layer-menu">
            <section className="layer-menu-header">
                <h1 className="layer-menu-heading">Layers</h1>
                <button className="layer-menu-exit" onClick={() => hideSideMenu()}>X</button>
            </section>

            {/*<LayerManager className="layer-menu-content"/>*/}
            <section className="layer-menu-content">
                <section className="layer-group">
                    <h2 className="layer-group-heading" onClick={() => toggleGroup(baseGroupRef)}>Base</h2>
                    <section ref={baseGroupRef} className="layer-group-content">
                        <article className="layer-item">
                            <input ref={osmLayerToggleRef} className="layer-item-toggle" type="radio" name="base" value={0} onClick={(event) => toggleBaseLayer(event)}/>
                            <h2 className="layer-item-heading">OSM</h2>
                        </article>
                        <article className="layer-item">
                            <input className="layer-item-toggle" type="radio" name="base" value={1} onClick={(event) => toggleBaseLayer(event)}/>
                            <h2 className="layer-item-heading">Terrain</h2>
                        </article>
                        <article className="layer-item">
                            <input className="layer-item-toggle" type="radio" name="base" value={2} onClick={(event) => toggleBaseLayer(event)}/>
                            <h2 className="layer-item-heading">Toner</h2>
                        </article>
                        <article className="layer-item">
                            <input className="layer-item-toggle" type="radio" name="base" value={3} onClick={(event) => toggleBaseLayer(event)}/>
                            <h2 className="layer-item-heading">Bing Maps</h2>
                        </article>
                        <article className="layer-item">
                            <input className="layer-item-toggle" type="radio" name="base" value={4} onClick={(event) => toggleBaseLayer(event)}/>
                            <h2 className="layer-item-heading">OpenTopo</h2>
                        </article>
                    </section>
                </section>

                <section className="layer-group">
                    <h2 className="layer-group-heading" onClick={() => toggleGroup(landGroupRef)}>Land Cover</h2>
                    <section ref={landGroupRef} className="layer-group-content">
                        <article className="layer-item">
                            <input className="layer-item-toggle" type="checkbox" name="slope" value={5} onClick={(event) => toggleLayer(event)}/>
                            <h2 className="layer-item-heading">Slopes</h2>
                        </article>
                        <article className="layer-item">
                            <input className="layer-item-toggle" type="checkbox" name="fire-history" value={6} onClick={(event) => toggleLayer(event)}/>
                            <h2 className="layer-item-heading">Fire History</h2>
                        </article>
                        <article className="layer-item">
                            <input className="layer-item-toggle" type="checkbox" name="soil-data" value={7} onClick={(event) => toggleLayer(event)}/>
                            <h2 className="layer-item-heading">Soil Data</h2>
                        </article>
                    </section>
                </section>
            </section>
        </div>
    )
}

export default LayerMenu;