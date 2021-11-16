import './App.css';
import OpenLayersMap from './components/OpenLayersMap.js'
import {Helmet} from "react-helmet";

function App()
{
  const view = {
    center: [0, 0],
    zoom: 2
  };

  return (
    <div className="App">
        <OpenLayersMap mapID="map" view={view} />
    </div>
  );
}

export default App;
