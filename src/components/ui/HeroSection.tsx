const HeroSection: React.FC = () => {
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
        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/vercel.svg"; // Make sure to place your PDF in the public folder
            link.download = "arthit-resume.pdf";
            link.click();
          }}
          className="mt-6 px-6 py-3 bg-purple-500 hover:bg-transparent hover:border hover:border-purple-500 hover:text-purple-500 text-black font-bold group pointer-events-auto relative flex h-fit w-fit items-center justify-center overflow-hidden rounded-lg  uppercase tracking-wide"
        >
          <span className="absolute inset-0 z-1 block overflow-hidden">
            <span className="block h-full w-full translate-y-full rounded-t-[15rem] bg-[var(--color-accent-600)] transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] sm:group-hover:translate-y-0 sm:group-hover:rounded-none"></span>
          </span>
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
