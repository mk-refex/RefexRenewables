import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      id="about"
      data-section
      className="py-20 bg-white"
      ref={sectionRef}
    >
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <div
            className={`mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-20"
            }`}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-orange-500 mb-6">
              Pioneer Solar Company In India
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-8">
              We provide end-to-end renewable energy solutions!
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Refex Renewables, one of the best solar companies and a leading
                pioneer of the Indian solar industry, is rebuilding its business
                in India and globally. Bringing some of the best solar products
                in India, Refex Renewables company's latest offerings will focus
                on distributed energy in C&I, rural energy (like solar water
                pumps), home and street lighting systems, SME, residential
                segments, and emerging technologies (like waste heat to power).
                We have built solar projects in 8000+ locations across 15+
                states. We have achieved 25000+ installations and 50+ microgrid
                projects.
              </p>
              <p>
                Refex Renewables is the top solar installation company and a
                leading innovative and personalized solar energy solutions
                provider. It provides solar power to residential and commercial
                complexes and businesses in urban cities & rural towns across
                the country. With 20+ years of experience and expertise in the
                solar pv industry, Refex Renewables is a specialist in design,
                execution, installation and maintenance of solar power systems.
                Whether it is a commercial complex or your personal living
                space, we provide high-quality and sustainable solar power
                plants. Refex Renewables envisions a future, where renewable
                energy is an affordable solution to sustainable living and
                creating an affordable uninterrupted supply of alternative
                energy is our contribution to a greener planet.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div
                className={`relative transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                <img
                  src="https://refexrenewables.com/img/home/about-img.jpg"
                  alt="Solar Power Plant"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>

              <div
                className={`space-y-6 transition-all duration-1000 delay-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-orange-500">
                  We have built solar projects in 8000+ locations!
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  As one of the best solar companies in the country, we have
                  built solar projects in 8000+ locations across 15+ states. We
                  have achieved 25000+ installations and 50+ microgrid projects.
                  Refex Renewables's latest offerings will focus on distributed
                  energy in C&I, Rural Energy (like Solar Water Pumps), Home and
                  Street Lighting Systems, SME, Residential segments, and
                  emerging technologies (like waste heat to power).
                </p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer">
                  LEARN MORE
                </button>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center mt-20 mb-20">
              <div
                className={`space-y-6 transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-orange-500">
                  Solar Energy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Since 2018, the Company has been actively engaged in the
                  conceptualization to commercialization of solar power systems
                  for megawatt-scale utility projects and commercial rooftop
                  solar PV installations. The Company's portfolio includes a
                  wide range of Solar PV power plants, including industrial and
                  commercial rooftop systems, ground-mounted installations, and
                  projects for land-owning farmers. It holds the distinction of
                  being the first to execute Solar PV plants designed
                  specifically to supply renewable traction power along railway
                  tracks for Indian Railways. Today, it is actively involved
                  across all dimensions of renewable energy, including emerging
                  technologies such as battery energy storage systems.
                </p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer">
                  LEARN MORE
                </button>
              </div>

              <div
                className={`relative transition-all duration-1000 delay-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                <img
                  src="https://refexrenewables.com/img/residential/rural-img-1.jpg"
                  alt="Solar Energy Solutions"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
