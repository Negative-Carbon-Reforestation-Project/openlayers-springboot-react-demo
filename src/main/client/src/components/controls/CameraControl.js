import {useSelector} from "react-redux";

/**
 * Container for the Camera controls
 * @returns {JSX.Element}
 */
const CameraControl = () => {
    const map = useSelector((state) => state.maps.value.map);

    const zoom = (modifier=0.5) => {
        let view = map.getView();
        let currentZoomLevel = view.getZoom();
        view.setZoom(currentZoomLevel + modifier);
    }

    return (
        <>
            <div className="zoom-controls" tabIndex={0} aria-label="Zoom in and out controls">
                <button className="zoom-in-control" aria-label="Zoom in" onClick={() => zoom()} title="Zoom in">
                    +
                </button>

                <button className="zoom-out-control" aria-label="Zoom out" onClick={() => zoom(-0.5)} title="Zoom out">
                    -
                </button>
            </div>
        </>
    )
}

export default CameraControl;