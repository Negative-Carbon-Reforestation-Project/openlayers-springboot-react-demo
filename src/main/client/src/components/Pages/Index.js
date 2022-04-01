import React, {useEffect, useRef} from "react";
import heroVideo from "../../resources/videos/hero.mp4";
import Logo from "../Base/Logo";
/***
 * Container for the Index page
 * @returns {JSX.Element}
 * @constructor
 */
const Index = () => {

    const navRef = useRef();

    const subscribeToScroll = () => {
        window.onscroll = () => {
            if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10)
            {
                navRef.current.style.background = "black";
            }
            else
            {
                navRef.current.style.background = "none";
            }
        }
    }
    useEffect(() => {
        subscribeToScroll();
    });

    return (
        <>
            <nav ref={navRef} className="nav">
                <Logo className="nav-logo"/>

                <ul className="nav-items">
                    <li className="nav-item">
                        <a href="#mission" className="nav-link" tabIndex={1}>Our Mission</a>
                    </li>
                    <li className="nav-item">
                        <a href="/maps" className="nav-link call-to-action" tabIndex={2}>Explore</a>
                    </li>
                </ul>
            </nav>

            <main className="index-container">
                <section className="hero">
                    <div className="hero-caption">
                        <h1 className="hero-caption-text">Let's Reforest Washington</h1>
                        <button className="hero-button" onClick={() => document.location.href = "/maps"} tabIndex={3}>Explore Opportunities</button>
                    </div>
                    <video className="hero-video" autoPlay={true} muted={true} loop={true} playsInline={true}>
                        <source src={heroVideo} type="video/mp4"/>
                    </video>
                </section>

                <section className="mission">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab atque consequatur deserunt dolorem ducimus eaque eum, eveniet excepturi expedita maxime mollitia nulla quisquam repellendus rerum sed similique, sunt. Cupiditate, quo.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem cum quam quod! Asperiores cumque, eaque id incidunt iure soluta tenetur ullam veritatis. Alias aspernatur consequuntur optio recusandae rem sit.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequuntur corporis dignissimos ducimus est et laboriosam nihil obcaecati pariatur possimus quae quibusdam repellendus rerum sequi sint, suscipit vero vitae voluptatum.
                    </p>
                </section>
            </main>
        </>
    )
};

export default Index;