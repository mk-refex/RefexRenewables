export default function Hero() {
  const scrollToContent = () => {
    const contentSection = document.querySelector(".solar-content-section");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/img/why-go-solar/whyGo-banner.jpg)",
        }}
      ></div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4">
          <span className="text-black">An unlimited supply of </span>
          <span className="font-bold text-black">clean energy</span>
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
