"use client";

import React, { useState } from "react";

const HeroSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  return (
    <section id="hero">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-start justify-center min-h-screen text-center p-6 text-gray-400">
        <h1 className="text-5xl md:text-8xl font-bold text-purple-500">
          {`FULL STACK`}
        </h1>
        <h2 className="text-6xl md:text-9xl font-bold text-white">{`DEVELOPER`}</h2>
        <p className="mt-4 max-w-lg text-left rounded-lg">
          {`Hi! I'm a creative Full Stack Developer with 3+ years of experience in
          building high-performance, scalable, and responsive web apps
          solutions.`}
        </p>

        <div className="relative h-auto" onMouseEnter={handleMouseEnter}>
          <button
            className={`mt-6 px-6 py-3  hover:bg-transparent hover:border hover:border-purple-500 hover:text-purple-500 ${
              isOpen
                ? "bg-transparent border border-purple-500 text-purple-500"
                : " bg-purple-500 text-black "
            } font-bold group pointer-events-auto relative flex h-fit w-fit items-center justify-center overflow-hidden rounded-lg  uppercase tracking-wide`}
          >
            <span className="relative z-2 block overflow-hidden transition-all">
              <span
                className="block after:absolute after:left-0 after:block after:translate-y-0 after:transition-all after:duration-500 after:ease-[cubic-bezier(0.77,0,0.175,1)] after:content-[attr(data-after)] sm:group-hover:after:-translate-y-full"
                data-after="Download resume"
              >
                <span className="flex transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] sm:group-hover:-translate-y-full">
                  {`Download resume`}
                </span>
              </span>
            </span>
          </button>

          {isOpen && (
            <div
              className="absolute right-0 mt-2 w-full  rounded-md shadow-lg py-1 z-10"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="/Resume.pdf"
                target="_blank"
                download="Resume.pdf"
                className="block px-4 py-2 bg-purple-500 text-black hover:bg-transparent hover:border hover:border-purple-500 hover:text-purple-500"
                onClick={handleMouseLeave}
              >
                {`Resume (Thai)`}
              </a>
              <a
                href="/Resume-Eng.pdf"
                target="_blank"
                download="Resume-Eng.pdf"
                className="block px-4 py-2 bg-purple-500 text-black hover:bg-transparent hover:border hover:border-purple-500 hover:text-purple-500"
                onClick={handleMouseLeave}
              >
                {`Resume (English)`}
              </a>
            </div>
          )}
        </div>

        <div className=" absolute bottom-4 md:bottom-40 right-12 md:right-16 flex flex-col gap-7 md:gap-10 text-right">
          <div className="flex flex-col">
            <span className="text-3xl md:text-6xl font-bold text-purple-500">
              {`3+`}
            </span>
            <span>{`Years of Experience`}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl md:text-6xl font-bold text-purple-500">
              {`2+`}
            </span>
            <span>{`Completed Projects`}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
