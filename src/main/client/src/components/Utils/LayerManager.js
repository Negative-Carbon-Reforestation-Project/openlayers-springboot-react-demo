import React from "react";
import {useSelector} from "react-redux";

const LayerManager = ({className}) => {

    const map = useSelector((state) => state.maps.value.map);


    const renderLayers = () => {
        let layers = map.getLayers();
    }
    return <div className={className}>

    </div>
};

export default LayerManager;