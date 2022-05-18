import {useSelector} from "react-redux";
import {useState} from "react";
import olcs from "olcs/core";
import tiltDown from "../../resources/images/icons/tilt-up-arrow-512x512.svg";
import tiltUp from "../../resources/images/icons/tilt-down-arrow-512x512.svg";
import cameraIcon from "../../resources/images/icons/camera-control-512x512.svg";

/**
 * Container for the Camera controls
 * @returns {JSX.Element}
 */
const CameraControl = () => {
    const map = useSelector((state) => state.maps.value.map);
    const cesiumMap = useSelector((state) => state.maps.value.cesiumMap);

    const [zoomTimer, setZoomTimer] = useState();
    const [tiltTimer, setTiltTimer] = useState();

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

    const tilt = (angle=0.05) => {
        let scene = cesiumMap.getCesiumScene();
        let camera = scene.camera;
        let pivot = olcs.pickBottomPoint(scene);

        if (!pivot)
        {
            console.log("No pivot");
            return;
        }

        const transform = window.Cesium.Matrix4.fromTranslation(pivot);
        const axis = camera.right;
        olcs.rotateAroundAxis(camera, -angle, axis, transform, {})
    }

    const setTiltInterval = (angle=0.05, timeout=300) => {
        setTiltTimer(setInterval(() => {
            tilt(angle);
        }, timeout));
    }

    return (
        <>
            {/*<div className="zoom-controls" tabIndex={0} aria-label="Zoom in and out controls">*/}
            {/*    <button className="zoom-in-control control"*/}
            {/*            aria-label="Zoom in"*/}
            {/*            title="Zoom in"*/}
            {/*            onClick={() => zoom()}*/}
            {/*            onMouseDown={() => setZoomInterval()}*/}
            {/*            onMouseUp={() => clearInterval(zoomTimer)}*/}
            {/*    >*/}
            {/*        +*/}
            {/*    </button>*/}



            {/*    <button className="zoom-out-control control"*/}
            {/*            aria-label="Zoom out"*/}
            {/*            title="Zoom out"*/}
            {/*            onClick={() => zoom(-0.5)}*/}
            {/*            onMouseDown={() => setZoomInterval(-0.5)}*/}
            {/*            onMouseUp={() => clearInterval(zoomTimer)}*/}
            {/*    >*/}
            {/*        -*/}
            {/*    </button>*/}
            {/*</div>*/}
            
            <div className="camera-controls">
                <button className="expand-camera-controls control" aria-label="Toggle more camera controls">
                    <img src={cameraIcon} alt="Camera icon"/>
                </button>

                <section className="expanded-camera-controls">
                        <button className="zoom-in-camera control"
                                aria-label="Zoom in"
                                title="Zoom in"
                                onClick={() => zoom()}
                                onMouseDown={() => setZoomInterval()}
                                onMouseUp={() => clearInterval(zoomTimer)}
                        >
                            +
                        </button>

                        <button className="zoom-out-camera control"
                                aria-label="Zoom out"
                                title="Zoom out"
                                onClick={() => zoom(-0.5)}
                                onMouseDown={() => setZoomInterval(-0.5)}
                                onMouseUp={() => clearInterval(zoomTimer)}
                        >
                            -
                        </button>

                        <button className="tilt-down-control control"
                                aria-label="Tilt down"
                                title="Tilt down"
                                onClick={() => tilt()}
                                onMouseDown={() => setTiltInterval()}
                                onMouseUp={() => clearInterval(tiltTimer)}
                        >
                            <img src={tiltDown} alt="Tilt down arrow"/>
                        </button>

                        <button className="tilt-up-control control"
                                aria-label="Tilt up"
                                title="Tilt up"
                                onClick={() => tilt(-0.05)}
                                onMouseDown={() => setTiltInterval(-0.05)}
                                onMouseUp={() => clearInterval(tiltTimer)}
                        >
                            <img src={tiltUp} alt="Tilt up arrow"/>
                        </button>
                </section>






            </div>
        </>
    )
}

export default CameraControl;