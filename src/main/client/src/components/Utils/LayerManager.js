import React, {useContext} from "react";
import MapContext from "../Map/MapContext";

const LayerManager = ({className}) => {

    const { map } = useContext(MapContext);

    const renderLayers = () => {
        let layers = map.getLayers();
    }
    return <div className={className}>

    </div>
};

export default LayerManager;