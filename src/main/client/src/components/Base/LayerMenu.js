import React, {useContext, useRef} from "react";
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

    const hideSideMenu = () => {
        layerMenuRef.current.style.display = "none";
        sideMenuRef.current.style.display = "none";
    };

    const toggleLayer = (event) => {
        let layerIndex = Number(event.target.getAttribute("data-value"));
        let layers = map.getLayers();

        let isLayerVisible = layers.item(layerIndex).getVisible();
        layers.item(layerIndex).setVisible(!isLayerVisible);

        console.log(layers.item(layerIndex));
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
                    <h2 className="layer-group-heading"></h2>
                    <article className="layer-group-content"></article>
                </section>
                <article className="layer-item">
                    <h2 className="layer-item-heading" data-value={0} onClick={(event) => toggleLayer(event)}>OSM</h2>
                </article>
                <article className="layer-item">
                    <h2 className="layer-item-heading" data-value={1} onClick={(event) => toggleLayer(event)}>Terrain</h2>
                </article>
                <article className="layer-item">
                    <h2 className="layer-item-heading" data-value={2} onClick={(event) => toggleLayer(event)}>Toner</h2>
                </article>
                <article className="layer-item">
                    <h2 className="layer-item-heading" data-value={3} onClick={(event) => toggleLayer(event)}>Bing Maps</h2>
                </article>
                <article className="layer-item">
                    <h2 className="layer-item-heading" data-value={4} onClick={(event) => toggleLayer(event)}>OpenTopo</h2>
                </article>
                <article className="layer-item">
                    <h2 className="layer-item-heading" data-value={5} onClick={(event) => toggleLayer(event)}>Layer 1</h2>
                </article>
                <article className="layer-item">
                    <h2 className="layer-item-heading" data-value={6} onClick={(event) => toggleLayer(event)}>Layer 2</h2>
                </article>
                <article className="layer-item">
                    <h2 className="layer-item-heading" data-value={7} onClick={(event) => toggleLayer(event)}>Layer 3</h2>
                </article>
            </section>
        </div>
    )
}

export default LayerMenu;