import React, {useEffect, useRef} from "react";
import heroVideo from "../../resources/videos/hero-1280x720.mp4";
import hamburgerIcon from "../../resources/images/icons/hamburger-menu-50x50.webp";
import hamburgerExitIcon from "../../resources/images/icons/exit-icon-50x50.webp";

import Logo from "../Base/Logo";
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
            <Navigation />

            <main id="main" className="index-container">
                <section className="hero" tabIndex={0} aria-label="Let's Re-forest Washington">
                    <article className="hero-caption">
                        <h1 className="hero-caption-text">Let's Reforest Washington</h1>
                        <button className="hero-button" onClick={() => document.location.href = "/maps"} >Explore Opportunities</button>
                    </article>
                    <video className="hero-video" autoPlay={true} muted={true} loop={true} playsInline={true}>
                        <source src={heroVideo} type="video/mp4"/>
                    </video>
                </section>

                <section className="mission-excerpt" tabIndex={0} aria-label="Excerpt on why reforestation is important">
                    <article className="mission-excerpt-container" tabIndex={0}>
                        <h2>What Is The Negative Carbon Reforestation Project?</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab atque consequatur deserunt dolorem ducimus eaque eum, eveniet excepturi expedita maxime mollitia nulla quisquam repellendus rerum sed similique, sunt. Cupiditate, quo.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem cum quam quod! Asperiores cumque, eaque id incidunt iure soluta tenetur ullam veritatis. Alias aspernatur consequuntur optio recusandae rem sit.
                        </p>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequuntur corporis dignissimos ducimus est et laboriosam nihil obcaecati pariatur possimus quae quibusdam repellendus rerum sequi sint, suscipit vero vitae voluptatum.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequuntur corporis dignissimos ducimus est et laboriosam nihil obcaecati pariatur possimus quae quibusdam repellendus rerum sequi sint, suscipit vero vitae voluptatum.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequuntur corporis dignissimos ducimus est et laboriosam nihil obcaecati pariatur possimus quae quibusdam repellendus rerum sequi sint, suscipit vero vitae voluptatum.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequuntur corporis dignissimos ducimus est et laboriosam nihil obcaecati pariatur possimus quae quibusdam repellendus rerum sequi sint, suscipit vero vitae voluptatum.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequuntur corporis dignissimos ducimus est et laboriosam nihil obcaecati pariatur possimus quae quibusdam repellendus rerum sequi sint, suscipit vero vitae voluptatum.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequuntur corporis dignissimos ducimus est et laboriosam nihil obcaecati pariatur possimus quae quibusdam repellendus rerum sequi sint, suscipit vero vitae voluptatum.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequuntur corporis dignissimos ducimus est et laboriosam nihil obcaecati pariatur possimus quae quibusdam repellendus rerum sequi sint, suscipit vero vitae voluptatum.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequuntur corporis dignissimos ducimus est et laboriosam nihil obcaecati pariatur possimus quae quibusdam repellendus rerum sequi sint, suscipit vero vitae voluptatum.
                        </p>

                        <button className="mission-button" onClick={() => document.location.href = "/mission"}>Learn More</button>
                    </article>
                </section>

            </main>

            <Footer/>

        </>
    )
};

export default Index;