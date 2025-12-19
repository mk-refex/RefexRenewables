import { useState, useEffect, useRef } from "react";

export default function Services() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: "Compressed Biogas(CBG)",
      image: "/img/home/services-02.jpg",
      description: [
        "The Company has entered bioenergy venture and expects significant growth, driven by the development of anaerobic digestion plants. Currently, RRIL operates facilities with a combined capacity of 3.5 tons per day (TPD), with the projection to add 4 more plants in the next 18 months to achieve a cumulative plant input capacity of 1,150 TPD and an output capacity of 45 TPD of CBG.",
        "With a strategic goal to become India's largest CBG retail player by 2026, the Company plans to leverage its strong and well-established retail network, built over the last 25 years.",
      ],
    },
    {
      title: "CBG Production",
      image: "/img/home/services-01.jpg",
      description: [
        "RRIL is advancing towards being the largest developer of biogas‐to transport fuel facilities that convert agricultural residues, and MSW into carbon neutral CBG as a drop in alternative to imported CNG. These projects not only displace costly fuel imports and hedge consumers against price spikes by tapping the nation's most plentiful resource - organic and agriculture waste - but also diversify India's fuel basket, reduce foreign exchange outflows, and foster rural economic uplift through job creation in feedstock collection, plant operation, and logistics.",
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="services"
      data-section
      className="py-20 bg-gray-50"
      ref={sectionRef}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-orange-500 mb-6">
              Our Services
            </h2>
          </div>

          <div className="relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div
                className={`relative order-2 lg:order-1 transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                <img
                  src={services[activeSlide].image}
                  alt={services[activeSlide].title}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>

              <div
                className={`space-y-6 order-1 lg:order-2 transition-all duration-1000 delay-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
                  {services[activeSlide].title}
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  {services[activeSlide].description.map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer">
                  LEARN MORE
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mt-12">
              <button
                onClick={() =>
                  setActiveSlide((prev) =>
                    prev === 0 ? services.length - 1 : prev - 1
                  )
                }
                className="w-12 h-12 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all duration-300 cursor-pointer"
              >
                <i className="ri-arrow-left-s-line text-2xl"></i>
              </button>
              <div className="flex space-x-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlide === index
                        ? "bg-orange-500 w-8"
                        : "bg-gray-300 hover:bg-orange-300"
                    }`}
                  ></button>
                ))}
              </div>
              <button
                onClick={() =>
                  setActiveSlide((prev) =>
                    prev === services.length - 1 ? 0 : prev + 1
                  )
                }
                className="w-12 h-12 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all duration-300 cursor-pointer"
              >
                <i className="ri-arrow-right-s-line text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
