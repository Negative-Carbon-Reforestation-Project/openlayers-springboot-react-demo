import Navigation from "../Base/Navigation";
import Footer from "../Base/Footer";
import {useEffect} from "react";


const Mission = () => {

    /**
     * Once the component is mounted onto the DOM, dynamically update the page's title.
     */
    useEffect(() =>{
        document.title = "Negative Carbon Reforestation Project - Mission";
    })

    return (
        <>
            <Navigation />

            <main id="main" className="mission-container">
                <section className="mission-hero">
                    <h1 className="mission-hero-header">Our Mission</h1>
                </section>

                <section className="mission-statement" tabIndex={0} aria-label="Mission statement" role="document">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi at, aut beatae blanditiis eum id laboriosam obcaecati odit officiis quae quas quasi, quod quos repudiandae similique totam voluptate voluptates!</p>
                </section>

            </main>

            <Footer/>
        </>
    )
}

export default Mission;