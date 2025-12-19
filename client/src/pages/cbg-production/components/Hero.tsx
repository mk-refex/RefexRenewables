export default function Hero() {
  const scrollToContent = () => {
    const nextSection = document.querySelector("#content");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(/img/residential/rural-banner.jpg)" }}
    >
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
          Compressed Biogas (CBG)
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
