import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-[#FDF8F5]">
      <Navbar />
      <Hero />
      <Services />
      <Contact id="contact" />
      <Footer />
    </div>
  );
}

export default Home;
