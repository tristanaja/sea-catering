import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="bg-[#FDF8F5]">
      <Navbar />
      <Hero />
      <Services />
      <Contact id="contact" />
    </div>
  );
}

export default Home;
