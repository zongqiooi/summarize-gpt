import React from "react";
import Hero from "./components/Hero";
import Summary from "./components/Summary";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <Summary />
        <Footer />
      </div>
    </main>
  );
};

export default App;
