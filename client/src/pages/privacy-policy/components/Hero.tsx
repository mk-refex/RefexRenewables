export default function Hero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(/img/about/aboutBanner.jpg)" }}
    >
      <div className="text-center z-10">
        <h1 className="text-6xl md:text-7xl mb-4">
          <span className="text-black font-light">Privacy </span>
          <span className="text-black font-bold">Policy</span>
        </h1>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
        <div className="w-px h-32 bg-black"></div>
        <button
          onClick={scrollToContent}
          className="w-10 h-10 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center cursor-pointer hover:bg-orange-500 transition-all duration-300 group"
          aria-label="Scroll to content"
        >
          <i className="ri-arrow-down-s-fill text-xl text-black group-hover:text-white w-6 h-6 flex items-center justify-center"></i>
        </button>
      </div>
    </section>
  );
}
