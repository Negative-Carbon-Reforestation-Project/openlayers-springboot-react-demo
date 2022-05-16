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
import {useSelector} from "react-redux";

/**
 * Container for the Layer switch control
 * @returns {JSX.Element}
 * @constructor
 */
const LayerControl = () => {

    const map = useSelector((state) => state.maps.value.map);
    const cesiumMap = useSelector((state) => state.maps.value.cesiumMap);

    const layerMenuCollapsedRef = useRef();
    const layerMenuExpandedRef = useRef();

    const [hideMenuTimer, setHideMenuTimer] = useState();
    const [hideExpandedMenuTimer, setHideExpandedMenuTimer] = useState();

    /**
     * Shows the collapsed layer menu
     *
     * @remark Sets focus to it when shown and if on a smaller viewport, shows the expanded menu instead.
     */
    const showCollapsedLayerMenu = () => {
        // debugger;
        if(window.matchMedia("(max-width: 600px)").matches)
        {
            showExpandedLayerMenu();
        }
        else
        {
            layerMenuCollapsedRef.current.classList.add("active-flex");
            layerMenuCollapsedRef.current.focus();
        }
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

    /**
     * Toggles a layer's visibility
     * @param event The click event
     */
    const toggleLayer = (layerNumber, event) => {
        let layerIndex = Number(layerNumber);
        let layers = map.getLayers();

        let isVisible = layers.item(layerIndex).getVisible();
        layers.item(layerIndex).setVisible(!isVisible);

    }

    /**
     * Toggles the base layer visibility
     * @remark Only one base layer can be active, so disabling other base layers is required.
     * @param event The click event
     */
    const toggleBaseLayer = (layerNumber, event) => {
        let layerIndex = Number(layerNumber);
        let layers = map.getLayers();

        for (let i = 0; i <= 4; i++)
        {
            layers.item(i).setVisible(false);
        }

        layers.item(layerIndex).setVisible(true);
    }

    const toggleCesiumView = (event) => {
        cesiumMap.setEnabled(event.target.checked);
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
                <button className="layer-group"
                        aria-label="Toggle default base layer"
                        title="Toggle the default base layer"
                        onClick={(event) => toggleBaseLayer(0, event)}
                >
                    <img className="layer-preview" src={osmPreview} alt="Layer icon"/>
                    <p>Default</p>
                </button>

                <button className="layer-group"
                        aria-label="Toggle aerial base layer"
                        title="Toggle the aerial view base layer"
                        onClick={(event) => toggleBaseLayer(1, event)}
                >
                    <img className="layer-preview" src={aerialPreview} alt="Layer icon"/>
                    <p>Aerial</p>
                </button>

                <button className="layer-group"
                        aria-label="Toggle black and white base layer"
                        title="Toggle the black and white base layer"
                        onClick={(event) => toggleBaseLayer(2, event)}
                >
                    <img className="layer-preview" src={blackWhitePreview} alt="Layer icon"/>
                    <p>Toner</p>
                </button>

                <button className="layer-group"
                        aria-label="Toggle topographical base layer"
                        title="Toggle the topographical base layer"
                        onClick={(event) => toggleBaseLayer(3, event)}
                >
                    <img className="layer-preview" src={topoPreview} alt="Layer icon"/>
                    <p>Topo</p>
                </button>

                <button className="layer-group"
                        aria-label="Toggle terrain base layer"
                        title="Toggle the terrain base layer"
                        onClick={(event) => toggleBaseLayer(4, event)}
                >
                    <img className="layer-preview" src={terrainPreview} alt="Layer icon"/>
                    <p>Terrain</p>
                </button>

                <button className="layer-group"
                        onClick={() => showExpandedLayerMenu()}
                        title="View more layer options"
                        aria-label="View more layer options"
                >
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
                        <button className="layer-group"
                                aria-label="Toggle slope landcover layer"
                                title="Toggle the slope landcover layer"
                                onClick={(event) => toggleLayer(5, event)}
                        >
                            <img className="layer-preview" src={slopesPreview} alt="Layer icon"/>
                            <p>Slope</p>
                        </button>

                        <button className="layer-group"
                                aria-label="Toggle wildfires landcover layer"
                                title="Toggle the wildfires landcover layer"
                                onClick={(event) => toggleLayer(6, event)}
                        >
                            <img className="layer-preview" src={firePreview} alt="Layer icon"/>
                            <p>Wildfires</p>
                        </button>

                        <button
                            className="layer-group"
                            aria-label="Toggle soil landcover layer"
                            title="Toggle the soil landcover layer"
                            onClick={(event) => toggleLayer(7, event)}
                        >
                            <img className="layer-preview" src={soilPreview} alt="Layer icon"/>
                            <p>Soil</p>
                        </button>

                        <button className="layer-group"
                                aria-label="Toggle tree density landcover layer"
                                title="Toggle the tree density landcover layer"
                                onClick={(event) => toggleLayer(8, event)}
                        >
                            <img className="layer-preview" src={treeDensityPreview} alt="Layer icon"/>
                            <p>Density</p>
                        </button>
                    </section>
                </section>

                <section className="base-layers">
                    <p>Base</p>

                    <section className="base-layer-previews" aria-label="Base layer options" tabIndex={0}>
                        <button className="layer-group"
                                aria-label="Toggle default base layer"
                                title="Toggle the default base layer"
                                onClick={(event) => toggleBaseLayer(0, event)}
                        >
                            <img className="layer-preview" src={osmPreview} alt="Layer icon"/>
                            <p>Default</p>
                        </button>

                        <button className="layer-group"
                                aria-label="Toggle aerial base layer"
                                title="Toggle the aerial view base layer"
                                onClick={(event) => toggleBaseLayer(1, event)}
                        >
                            <img className="layer-preview" src={aerialPreview} alt="Layer icon"/>
                            <p>Aerial</p>
                        </button>

                        <button className="layer-group"
                                aria-label="Toggle black and white base layer"
                                title="Toggle the black and white base layer"
                                onClick={(event) => toggleBaseLayer(2, event)}
                        >
                            <img className="layer-preview" src={blackWhitePreview} alt="Layer icon"/>
                            <p>Toner</p>
                        </button>

                        <button className="layer-group"
                                aria-label="Toggle topographical base layer"
                                title="Toggle the topographical base layer"
                                onClick={(event) => toggleBaseLayer(3, event)}
                        >
                            <img className="layer-preview" src={topoPreview} alt="Layer icon"/>
                            <p>Topo</p>
                        </button>

                        <button className="layer-group"
                                aria-label="Toggle terrain base layer"
                                title="Toggle the terrain base layer"
                                onClick={(event) => toggleBaseLayer(4, event)}
                        >
                            <img className="layer-preview" src={terrainPreview} alt="Layer icon"/>
                            <p>Terrain</p>
                        </button>
                    </section>
                </section>

                <section className="cesium-option">
                    <input className="cesium-option-toggle" type="checkbox" id="Toggle 3D View" onClick={(event) => toggleCesiumView(event)}/>
                    <label htmlFor="Toggle 3D View">Toggle 3D View</label>
                </section>
            </div>
        </>
    )
}

export default LayerControl;