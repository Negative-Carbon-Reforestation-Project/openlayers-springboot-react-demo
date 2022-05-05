import Navigation from "../base/Navigation";
import Footer from "../base/Footer";
import React, {useEffect} from "react";

/**
 * Container for the Mission page
 * @returns {JSX.Element}
 */
const Mission = () => {

    /**
     * Once the component is mounted onto the DOM, dynamically update the page's title.
     */
    useEffect(() =>{
        document.title = "Negative Carbon Reforestation Project - Mission";
    })

    return (
        <>
            <Navigation skipLink="#mission-container"/>

            <main id="mission-container" className="container">
                <section id="mission-hero" className="hero">
                    <h1 className="hero-header">Our Mission</h1>
                </section>

                <section id="mission-content" className="content" tabIndex={0} aria-label="Mission statement" role="document">
                   <p>Every time we step outside we are reminded of how fortunate we are to live among the lush forests that surround us in the Pacific Northwest. This near constant reminder of the beauty of nature, and the alarming concerns brought on by our worsening climate have shown a clear need for technologies that can assist those who work on our behalf to restore and maintain the environment.</p>
                   <p>We at NCRP understand that technology cannot take the place of hands in the earth, so we thought about how to best utilize our skill sets to build a platform that can be used by the people directly engaged with reforestation efforts. The result of our work is seen here: a platform that utilizes deep learning neural networks to help identify potential locations for reforestation efforts, which will reduce the amount of time and money required to identify and survey reforestation sites.</p>
                   <p>We hope that through the use of our software, we can help Washington remain green for decades to come, and now that you’re here, maybe you can help too!</p>
                    <button id="explore-button" className="call-to-action-button" onClick={() => document.location.href = "/maps"} >Explore Opportunities</button>

                </section>

            </main>

            <Footer/>
        </>
    )
}

export default Mission;