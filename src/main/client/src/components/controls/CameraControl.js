/**
 * Container for the Camera controls
 * @returns {JSX.Element}
 */
const CameraControl = () => {
    return (
        <>
            <div className="zoom-controls" tabIndex={0} aria-label="Zoom in and out controls">
                <button className="zoom-in-control" aria-label="Zoom in">
                    +
                </button>

                <button className="zoom-out-control" aria-label="Zoom out">
                    -
                </button>
            </div>
        </>
    )
}

export default CameraControl;