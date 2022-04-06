import Navigation from "../Base/Navigation";
import Footer from "../Base/Footer";

const Mission = () => {
    return (
        <>
            <Navigation />

            <main id="main" className="mission-container">
                <section className="mission-hero">
                    <h1 className="mission-hero-header">Our Mission</h1>
                </section>

                <section className="mission-statement">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi at, aut beatae blanditiis eum id laboriosam obcaecati odit officiis quae quas quasi, quod quos repudiandae similique totam voluptate voluptates!</p>
                </section>

                <Footer/>
            </main>
        </>
    )
}

export default Mission;