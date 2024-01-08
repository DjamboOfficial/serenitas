import React from "react";
import Navbar2 from "../components/Navbar2";
import "../About.css"; // You can create a separate CSS file for styling

const About = () => {
  return (
    <>
      <Navbar2 />
      <div className="about-container">
        <h1>Welcome to Serenitas</h1>
        <p>
          Your haven for focused productivity inspired by the wisdom of stoicism
          and the discipline of Ancient Rome. Embrace the essence of
          concentration as we guide you through structured Pomodoro sessions,
          optimizing your time in 25-minute intervals. Serenitas is more than a
          platform; it's a commitment to your productivity. In the spirit of
          stoicism, discover a space that encourages resilience, efficiency, and
          a profound connection with your work. Let the echoes of ancient wisdom
          propel you forward, carving a path of purpose and dedication. Your
          journey towards enhanced productivity starts here, where the ethos of
          Serenitas meets the spirit of Rome.
        </p>
        <p>
          Greetings! I'm Edoardo, a Berlin-based developer with a passion for
          Ancient Rome. Explore my{" "}
          <a href="#portfolio" className="portfolio-link">
            portfolio
          </a>{" "}
          for a showcase of my projects. Dive into my{" "}
          <a href="#github" className="github-link">
            GitHub repository
          </a>{" "}
          to witness my coding journey. Connect with me on{" "}
          <a href="#linkedin" className="linkedin-link">
            LinkedIn
          </a>{" "}
          to delve into the intersection of technology and history. Let's build
          something legendary together!
        </p>
      </div>
    </>
  );
};

export default About;
