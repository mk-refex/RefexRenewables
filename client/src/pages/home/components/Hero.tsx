import { useState, useEffect } from "react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const slides = [
    {
      title: "Get Smart",
      subtitle: "Go Solar!",
      image: "/img/home/Home-Page-Banner-01.jpg",
    },
    {
      title: "For a brighter",
      subtitle: "Tomorrow.",
      image: "/img/home/Home-Page-Banner-02.jpg",
    },
    {
      title: "Powered to be",
      subtitle: "Different.",
      image: "/img/home/Home-Page-Banner-03.jpg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection("next");
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    if (index > currentSlide) {
      setDirection("next");
    } else {
      setDirection("prev");
    }
    setCurrentSlide(index);
  };

  return (
    <section
      id="hero"
      data-section
      className="relative h-screen overflow-hidden"
    >
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          let positionClass = "";

          if (index === currentSlide) {
            positionClass = "translate-x-0";
          } else if (index < currentSlide) {
            positionClass = "-translate-x-full";
          } else {
            positionClass = "translate-x-full";
          }

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out ${positionClass}`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-6">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 animate-fade-in">
                    {slide.title}
                  </h3>
                  <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold animate-fade-in-delay">
                    {slide.subtitle}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
