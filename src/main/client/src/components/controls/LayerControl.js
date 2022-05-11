import {useRef, useState} from "react";
import layerIcon from "../../resources/images/icons/layer-control-20x20.png";
import osmPreview from "../../resources/images/backdrops/osm-preview-195x197.png";
import aerialPreview from "../../resources/images/backdrops/aerial-preview-195x197.png";
import blackWhitePreview from "../../resources/images/backdrops/bw-preview-195x197.png";
import terrainPreview from "../../resources/images/backdrops/terrain-preview-195x197.png";
import topoPreview from "../../resources/images/backdrops/topo-preview-195x197.png";

const LayerControl = () => {

    const layerMenuCollapsedRef = useRef();
    const layerMenuExpandedRef = useRef();

    const [hideMenuTimer, setHideMenuTimer] = useState();

    const showCollapsedLayerMenu = () => {
        layerMenuCollapsedRef.current.classList.add("active-flex");
    }
    const hideCollapsedLayerMenu = (timeout=0) => {
        setHideMenuTimer(setTimeout(() => layerMenuCollapsedRef.current.classList.remove("active-flex"), timeout));
    }

    const toggleExpandedLayerMenu = () => {
        layerMenuCollapsedRef.current.classList.remove("active-flex");
        layerMenuExpandedRef.current.classList.toggle("active-flex");
    }

    return (
        <>
            <button className="layer-control"
                    onMouseOver={() => {
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
                 onMouseOver={() => clearTimeout(hideMenuTimer)}
                 onMouseOut={() => hideCollapsedLayerMenu(800)}
            >
                <button className="layer-group">
                    <img className="layer-preview" src={osmPreview} alt="Layer icon"/>
                    <p>Default</p>
                </button>
                <button className="layer-group">
                    <img className="layer-preview" src={aerialPreview} alt="Layer icon"/>
                    <p>Aerial</p>
                </button>
                <button className="layer-group">
                    <img className="layer-preview" src={blackWhitePreview} alt="Layer icon"/>
                    <p>Toner</p>
                </button>
                <button className="layer-group">
                    <img className="layer-preview" src={topoPreview} alt="Layer icon"/>
                    <p>Topo</p>
                </button>
                <button className="layer-group">
                    <img className="layer-preview" src={terrainPreview} alt="Layer icon"/>
                    <p>Terrain</p>
                </button>
                <button className="layer-group">
                    <div className="expand-layers layer-preview">
                        <img className="expand-layers-icon"  src={layerIcon} alt="Layer icon"/>
                    </div>
                    <p>More</p>
                </button>
            </div>

            <div ref={layerMenuExpandedRef} className="layer-menu-expanded topo-skin">
                <button className="exit-layer-menu" onClick={() => toggleExpandedLayerMenu()}>X</button>

            </div>
        </>
    )
}

export default LayerControl;