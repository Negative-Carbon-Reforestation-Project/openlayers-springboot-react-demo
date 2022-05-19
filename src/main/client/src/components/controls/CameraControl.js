import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import olcs from "olcs/core";
import tiltDown from "../../resources/images/icons/distorted-tilt-down-arrow-512x512.svg";
import tiltUp from "../../resources/images/icons/distorted-tilt-up-arrow-512x512.svg";
import cameraIcon from "../../resources/images/icons/camera-control-512x512.svg";

/**
 * Container for the Camera controls
 * @returns {JSX.Element}
 */
const CameraControl = () => {
    const map = useSelector((state) => state.maps.value.map);
    const cesiumMap = useSelector((state) => state.maps.value.cesiumMap);
    const cesiumEnabled = useSelector((state) => state.maps.value.cesiumEnabled);

    const [zoomTimer, setZoomTimer] = useState();
    const [tiltTimer, setTiltTimer] = useState();

    const zoomControls = useRef();
    const cameraControl = useRef();
    const expandedCameraControls = useRef();

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

    const toggleZoomControls = () => {
        zoomControls.current.classList.toggle("active-flex-column");
    }

    const toggleCameraControls = () => {

        if (cesiumEnabled)
        {
            zoomControls.current.classList.remove("active-flex-column");
            cameraControl.current.classList.add("active");
        }
        else
        {
            zoomControls.current.classList.add("active-flex-column");
            cameraControl.current.classList.remove("active");
        }
    }

    const toggleExpandedCameraControls = () => {
        expandedCameraControls.current.classList.toggle("active");
    }

    useEffect(() => {

        toggleCameraControls();

    }, [cesiumEnabled])

    return (
        <>
            <div ref={zoomControls}
                 className="zoom-controls active-flex-column"
                 tabIndex={0}
                 aria-label="Zoom in and out controls"
            >
                <button className="zoom-in-control control"
                        aria-label="Zoom in"
                        title="Zoom in"
                        onClick={() => zoom()}
                        onMouseDown={() => setZoomInterval()}
                        onMouseUp={() => clearInterval(zoomTimer)}
                >
                    +
                </button>



                <button className="zoom-out-control control"
                        aria-label="Zoom out"
                        title="Zoom out"
                        onClick={() => zoom(-0.5)}
                        onMouseDown={() => setZoomInterval(-0.5)}
                        onMouseUp={() => clearInterval(zoomTimer)}
                >
                    -
                </button>
            </div>
            
            <div ref={cameraControl} className="camera-controls">
                <button className="expand-camera-controls control"
                        aria-label="Toggle more camera controls"
                        onClick={() => toggleExpandedCameraControls()}
                >
                    <img src={cameraIcon} alt="Camera icon"/>
                </button>

                <section ref={expandedCameraControls} className="expanded-camera-controls" aria-label="More camera controls for the map">
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
                                aria-label="Tilt down on the map"
                                title="Tilt down"
                                onClick={() => tilt()}
                                onMouseDown={() => setTiltInterval()}
                                onMouseUp={() => clearInterval(tiltTimer)}
                        >
                            <img src={tiltDown} alt="Tilt down arrow"/>
                        </button>

                        <button className="tilt-up-control control"
                                aria-label="Tilt up on the map"
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