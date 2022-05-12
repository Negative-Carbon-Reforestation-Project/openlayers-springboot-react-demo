import {useRef, useState} from "react";
import layerIcon from "../../resources/images/icons/layer-control-20x20.png";
import osmPreview from "../../resources/images/backdrops/osm-preview-195x197.png";
import aerialPreview from "../../resources/images/backdrops/aerial-preview-195x197.png";
import blackWhitePreview from "../../resources/images/backdrops/bw-preview-195x197.png";
import terrainPreview from "../../resources/images/backdrops/terrain-preview-195x197.png";
import topoPreview from "../../resources/images/backdrops/topo-preview-195x197.png";

import moreLayers from "../../resources/images/icons/more-layers.png";
import slopesPreview from "../../resources/images/icons/slopes-preview.png";
import firePreview from "../../resources/images/icons/fire-preview.png";
import soilPreview from "../../resources/images/icons/soil-preview.png";
import treeDensityPreview from "../../resources/images/icons/tree-density-preview.png";

/**
 * Container for the Layer switch control
 * @returns {JSX.Element}
 * @constructor
 */
const LayerControl = () => {

    const layerMenuCollapsedRef = useRef();
    const layerMenuExpandedRef = useRef();

    const [hideMenuTimer, setHideMenuTimer] = useState();
    const [hideExpandedMenuTimer, setHideExpandedMenuTimer] = useState();

    /**
     * Shows the collapsed layer menu
     *
     * @remark Sets focus to it when shown
     */
    const showCollapsedLayerMenu = () => {
        layerMenuCollapsedRef.current.classList.add("active-flex");
        layerMenuCollapsedRef.current.focus();
    }

    /**
     * Hides the collapsed layer menu after the given amount of time
     * @param timeout The time it takes to hide the collapsed menu. Default is 0 ms.
     * @remark The timeout ID is tracked in hideMenuTimer to allow the timeout to be cleared if a child receives focus
     */
    const hideCollapsedLayerMenu = (timeout=0) => {
        setHideMenuTimer(setTimeout(() => layerMenuCollapsedRef.current.classList.remove("active-flex"), timeout));
    }

    /**
     * Shows the expanded layer menu
     *
     * @remark Hides the collapsed menu when shown and also sets focus
     */
    const showExpandedLayerMenu = () => {
        layerMenuCollapsedRef.current.classList.remove("active-flex");
        layerMenuExpandedRef.current.classList.add("active-flex");
        layerMenuExpandedRef.current.focus();
    }

    /**
     * Hides the expanded layer menu after the given amount of time
     * @param timeout The time it takes to hide the expanded menu. Default is 0 ms.
     * @remark The timeout ID is tracked in hideMenuTimer to allow the timeout to be cleared if a child receives focus
     */
    const hideExpandedLayerMenu = (timeout=0) => {
        setHideExpandedMenuTimer(setTimeout(() => layerMenuExpandedRef.current.classList.remove("active-flex"), timeout));
    }


    return (
        <>
            <button className="layer-control"
                    aria-label="View layer options"
                    onMouseOver={() => {
                        clearTimeout(hideMenuTimer);
                        showCollapsedLayerMenu();
                    }}
                    onClick={() => {
                        clearTimeout(hideMenuTimer);
                        showCollapsedLayerMenu();
                    }}
                    onMouseEnter={() => clearTimeout(hideMenuTimer)}
                    onMouseOut={() => hideCollapsedLayerMenu(800)}
            >
                <img className="layer-control-icon" src={layerIcon} alt="Layer icon"/>
                <p>Layers</p>
            </button>

            <div ref={layerMenuCollapsedRef}
                 className="layer-menu-collapsed topo-skin"
                 aria-label="Layer options"
                 onMouseOver={() => clearTimeout(hideMenuTimer)}
                 onMouseOut={() => hideCollapsedLayerMenu(800)}
                 onFocus={() => clearTimeout(hideMenuTimer)}
                 onBlur={() => hideCollapsedLayerMenu(800)}
                 tabIndex={0}
            >
                <button className="layer-group" aria-label="Toggle default base layer">
                    <img className="layer-preview" src={osmPreview} alt="Layer icon"/>
                    <p>Default</p>
                </button>
                <button className="layer-group" aria-label="Toggle aerial base layer">
                    <img className="layer-preview" src={aerialPreview} alt="Layer icon"/>
                    <p>Aerial</p>
                </button>
                <button className="layer-group" aria-label="Toggle black and white base layer">
                    <img className="layer-preview" src={blackWhitePreview} alt="Layer icon"/>
                    <p>Toner</p>
                </button>
                <button className="layer-group" aria-label="Toggle topographical base layer">
                    <img className="layer-preview" src={topoPreview} alt="Layer icon"/>
                    <p>Topo</p>
                </button>
                <button className="layer-group" aria-label="Toggle terrain base layer">
                    <img className="layer-preview" src={terrainPreview} alt="Layer icon"/>
                    <p>Terrain</p>
                </button>
                <button className="layer-group" onClick={() => showExpandedLayerMenu()} aria-label="View more layer options">
                    <img className="layer-preview"  src={moreLayers} alt="Layer icon"/>
                    <p>More</p>
                </button>
            </div>

            <div ref={layerMenuExpandedRef}
                 className="layer-menu-expanded topo-skin"
                 aria-label="More layer options"
                 onBlur={() => hideExpandedLayerMenu()}
                 onFocus={() => clearTimeout(hideExpandedMenuTimer)}
                 tabIndex={0}
            >
                <section className="landcover-layers">
                    <p>Landcover</p>

                    <section className="landcover-layer-previews" aria-label="Landcover layer options" tabIndex={0}>
                        <button className="layer-group" aria-label="Toggle slope landcover layer">
                            <img className="layer-preview" src={slopesPreview} alt="Layer icon"/>
                            <p>Slope</p>
                        </button>
                        <button className="layer-group" aria-label="Toggle wildfires landcover layer">
                            <img className="layer-preview" src={firePreview} alt="Layer icon"/>
                            <p>Wildfires</p>
                        </button>
                        <button className="layer-group" aria-label="Toggle soil landcover layer">
                            <img className="layer-preview" src={soilPreview} alt="Layer icon"/>
                            <p>Soil</p>
                        </button>
                        <button className="layer-group" aria-label="Toggle tree density landcover layer">
                            <img className="layer-preview" src={treeDensityPreview} alt="Layer icon"/>
                            <p>Density</p>
                        </button>
                    </section>
                </section>

                <section className="base-layers">
                    <p>Base</p>

                    <section className="base-layer-previews" aria-label="Base layer options" tabIndex={0}>
                        <button className="layer-group" aria-label="Toggle default base layer">
                            <img className="layer-preview" src={osmPreview} alt="Layer icon"/>
                            <p>Default</p>
                        </button>
                        <button className="layer-group" aria-label="Toggle aerial base layer">
                            <img className="layer-preview" src={aerialPreview} alt="Layer icon"/>
                            <p>Aerial</p>
                        </button>
                        <button className="layer-group" aria-label="Toggle black and white base layer">
                            <img className="layer-preview" src={blackWhitePreview} alt="Layer icon"/>
                            <p>Toner</p>
                        </button>
                        <button className="layer-group" aria-label="Toggle topographical base layer">
                            <img className="layer-preview" src={topoPreview} alt="Layer icon"/>
                            <p>Topo</p>
                        </button>
                        <button className="layer-group" aria-label="Toggle terrain base layer">
                            <img className="layer-preview" src={terrainPreview} alt="Layer icon"/>
                            <p>Terrain</p>
                        </button>
                    </section>
                </section>

                <section className="cesium-option">
                    <input className="cesium-option-toggle" type="checkbox" id="Toggle 3D View"/>
                    <label htmlFor="Toggle 3D View">Toggle 3D View</label>
                </section>
            </div>
        </>
    )
}

export default LayerControl;