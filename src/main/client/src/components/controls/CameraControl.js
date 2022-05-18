import {useSelector} from "react-redux";
import {useState} from "react";

/**
 * Container for the Camera controls
 * @returns {JSX.Element}
 */
const CameraControl = () => {
    const map = useSelector((state) => state.maps.value.map);
    const [zoomTimer, setZoomTimer] = useState();

    /**
     * Zooms the map using the given modifier
     * @param modifier The amount the map is to be zoomed by. Negative values zoom out the map. The default is 0.5.
     */
    const zoom = (modifier=0.5) => {
        let view = map.getView();
        let currentZoomLevel = view.getZoom();
        view.setZoom(currentZoomLevel + modifier);
    }

    /**
     * Zooms the map using the given modifier in intervals
     * @param modifier The amount the map is to be zoomed by. Negative values zoom out the map. The default is 0.5.
     * @param timeout The time between intervals.
     * @remark Intervals are used to allow the user to hold down the zoom control to zoom in / out.
     * The intervals are cleared when the mouse is released.
     */
    const setZoomInterval = (modifier=0.5, timeout=300) => {
        setZoomTimer(setInterval(() => {
            zoom(modifier);
        }, timeout));
    }

    return (
        <>
            <div className="zoom-controls" tabIndex={0} aria-label="Zoom in and out controls">
                <button className="zoom-in-control"
                        aria-label="Zoom in"
                        title="Zoom in"
                        onClick={() => zoom()}
                        onMouseDown={() => setZoomInterval()}
                        onMouseUp={() => clearInterval(zoomTimer)}
                >
                    +
                </button>

                <button className="zoom-out-control"
                        aria-label="Zoom out"
                        title="Zoom out"
                        onClick={() => zoom(-0.5)}
                        onMouseDown={() => setZoomInterval(-0.5)}
                        onMouseUp={() => clearInterval(zoomTimer)}
                >
                    -
                </button>
            </div>
            
            <div className="camera-controls">
                <button className="expand-camera-controls" aria-label="More camera controls">
                    <img src="" alt=""/>
                </button>
            </div>
        </>
    )
}

export default CameraControl;