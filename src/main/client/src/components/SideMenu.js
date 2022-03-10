import React, {useContext, useRef} from "react";
import {Drawer} from "@mui/material";
import SideMenuContext from "./SideMenuContext";
import MapContext from "./Map/MapContext";
import LayerManager from "./LayerManager";

/**
 * Container for side menu
 */
const SideMenu = ({children}) => {
    const layerMenuRef = useRef();
    const sideMenuRef = useRef();
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
    }

    return (
        <SideMenuContext.Provider value={{sideMenuRef, layerMenuRef}}>
            <div ref={sideMenuRef} className="side-menu">
                <div ref={layerMenuRef} className="layer-menu">
                    <section className="layer-menu-header">
                        <h1 className="layer-menu-heading">Layers</h1>
                        <button className="layer-menu-exit" onClick={() => hideSideMenu()}>X</button>
                    </section>

                    <LayerManager className="layer-menu-content"/>
                    <section className="layer-menu-content">
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
                            <h2 className="layer-item-heading" data-value={3} onClick={(event) => toggleLayer(event)}>Watercolor</h2>
                        </article>
                        <article className="layer-item">
                            <h2 className="layer-item-heading" data-value={4} onClick={(event) => toggleLayer(event)}>GMaps</h2>
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

            </div>
            <>
                {children}
            </>
        </SideMenuContext.Provider>
    )
}

export default SideMenu;