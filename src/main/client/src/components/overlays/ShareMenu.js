import React, {useEffect, useRef} from "react";
import exitIcon from "../../resources/images/icons/exit-icon-50x50.png";

/**
 * Container for the Share Menu
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const ShareMenu = React.forwardRef((props, shareMenuRef) => {

    /**
     * Generates the html text for an embeddable map
     * @returns {string}
     */
    const generateEmbed = () => {
        let url = `${window.location.protocol}//${window.location.host}/maps/embed${window.location.hash}`;
        let embedHtml = `<iframe src='${url}' title='Embed of map' allowfullscreen='' loading='lazy' width='600' height='300' referrerpolicy='no-referrer-when-downgrade'></iframe>`;

        console.log(embedHtml);
        return embedHtml;
    }

    /**
     * Hides the Share menu
     */
    const hideMenu = () => {
        shareMenuRef.current.classList.remove("active-flex");
    }

    /**
     * Copies the value of the element found via the given selector to the clipboard
     * @param selector The selector for the element
     */
    const copyToClipboard = (selector) => {
       let input = document.querySelector(selector);
       navigator.clipboard.writeText(input.value);
    }

    const embedRef = useRef(generateEmbed());
    const linkRef = useRef(window.location.href);

    /**
     * Once the component is mounted onto the DOM, update the embed and link ref.
     *
     * @remark Updated whenever the window url changes.
     */
    useEffect(() => {
        embedRef.current = generateEmbed();
        linkRef.current = window.location.href;
    }, [window.location.href])

    return (
        <>
            <aside ref={shareMenuRef} className="share-menu topo-skin" tabIndex={0} aria-label="Share menu containing link to the map and html code for the map embed">
                <section className="share-menu-header">
                    <h2>Share</h2>
                    <button className="share-menu-exit" aria-label="Close share menu">
                        <img className="share-menu-exit-icon"
                             src={exitIcon}
                             alt="Exit share menu icon"
                             onClick={() => hideMenu()}
                        />
                    </button>
                </section>
                <hr className="share-menu-divider"/>

                <section className="share-link-section">
                    <h3>Share Link</h3>
                    <input id="share-link-input" className="share-input" type="text" value={linkRef.current} readOnly={true} aria-label="Shareable link to the map"/>
                    <button className="share-button" onClick={() => copyToClipboard("#share-link-input")}>Copy Link</button>
                </section>

                <section className="share-embed-section">
                    <h3>Embed Our Map</h3>
                    <input id="share-embed-input" className="share-input" type="text" value={embedRef.current} readOnly={true} aria-label="Shareable html code for the map embed"/>
                    <button className="share-button" onClick={() => copyToClipboard("#share-embed-input")}>Copy HTML</button>
                    <div className="embed-container" tabIndex={-1}>
                        <iframe src="http://localhost:3000/maps/embed"
                                className="embed"
                                frameBorder="0"
                                title="Embed of map"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                        >
                        </iframe>
                    </div>
                    <p className="share-embed-notice">
                        By sharing our map, you agree to the <a href="/terms" target="_blank" rel="noreferrer">Terms Of Service</a>.
                    </p>
                </section>
            </aside>
        </>
    )
});

export default ShareMenu;