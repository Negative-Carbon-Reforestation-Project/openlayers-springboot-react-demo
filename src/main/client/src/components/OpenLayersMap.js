import {
    interaction, layer, custom, control, //name spaces
    Interactions, Overlays, Controls,     //group
    Map, Layers, Overlay, Util    //objects
  } from "react-openlayers";

function OpenLayersMap(props)
{
   return (
    <div id={props.mapID}>
        <Map view={props.view} >
        <Layers>
            <layer.Tile/>
        </Layers>
        </Map>
    </div>
   );
}

export default OpenLayersMap;