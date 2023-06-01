import React from "react";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full pt-3 mb-10"></nav>
      <h1 className="head_text">
        Articles summarizer with <br className="max-md:hidden" />
        <span className="orange_gradient prevent-select">Summarize-GPT</span>
      </h1>
      <h2 className="desc">
        AI-powered article summarizer to simplify your reading and writing.
      </h2>
    </header>
  );
};

export default Hero;
