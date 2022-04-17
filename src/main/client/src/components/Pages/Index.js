import React, {useEffect} from "react";
import heroVideo from "../../resources/videos/hero-1280x720.mp4";
import Navigation from "../Base/Navigation";
import Footer from "../Base/Footer";

/***
 * Container for the Index page
 * @returns {JSX.Element}
 * @constructor
 */
const Index = () => {

    /**
     * Once the component is mounted onto the DOM, dynamically update the page's title.
     */
    useEffect(() =>{
        document.title = "Negative Carbon Reforestation Project - Home";
    })

    return (
        <>
            <Navigation skipLink="#index-container"/>

            <main id="index-container" className="container">
                <section id="index-hero" className="hero" tabIndex={0} aria-label="Let's Re-forest Washington">
                    <article className="hero-caption">
                        <h1 className="hero-caption-text">Let's Reforest Washington</h1>
                        <button id="hero-button" className="call-to-action-button" onClick={() => document.location.href = "/maps"} >Explore Opportunities</button>
                    </article>

                    <video className="hero-video" autoPlay={true} muted={true} loop={true} playsInline={true}>
                        <source src={heroVideo} type="video/mp4"/>
                    </video>
                </section>

                <section id="mission-excerpt" className="content" tabIndex={0} aria-label="Excerpt on why reforestation is important">
                    <article className="mission-excerpt-container" tabIndex={0}>
                        <h2>Why is reforestation important?</h2>
                        <p>Forests play an important role in balancing our ecosystem. They are responsible for reducing carbon levels in our atmosphere and providing an environment for a diverse group of plants and animals to thrive in. Unfortunately, they are being destroyed or damaged due to various reasons on a daily basis – disturbing not only the local biodiversity of the area but all of us.</p>
                        <p>Reforestation is the process of regenerating or replanting forest areas that have been destroyed or damaged. Even though forests have the capability to self-regenerate via the dispersion of seeds, forest lands that have been badly damaged cannot be regenerated unless aided through native methods such as planting new trees.</p>
                        <p>We at <abbr>NCRP</abbr> are committed to aiding the people who are directly involved in reforestation efforts in Washington.</p>
                        <button id="learn-more-button" className="call-to-action-button" onClick={() => document.location.href = "/mission"}>Learn More</button>
                    </article>
                </section>

            </main>

            <Footer/>

        </>
    )
};

export default Index;