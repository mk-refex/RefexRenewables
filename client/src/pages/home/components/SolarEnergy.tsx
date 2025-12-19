import { useEffect, useRef, useState } from "react";

export default function SolarEnergy() {
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
      id="solar"
      data-section
      className="py-20 bg-white"
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
              Solar Energy Solutions
            </h2>
          </div>

          <div
            className={`bg-white rounded-lg shadow-lg p-8 lg:p-12 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-orange-500 mb-8">
              RRIL's Renewable Energy Service Excellence
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Comprehensive Solar Installations
                </h3>
                <p>
                  Till date, RRIL has delivered through full-spectrum EPC and
                  IPP over 25,000+ installations across more than 8,000
                  locations including solar projects across commercial &
                  industrial (C&I), rural electrification, home and street
                  lighting systems, SME, residential segments, and emerging
                  technologies (like waste heat to power). Each installation
                  contributes clean, on site generation capacity, reducing
                  reliance on grid imports and enhancing resilience in remote
                  locales. RRIL serves prestigious clients including Indian
                  Railways, GUVNL, HCL, HSL, Lumax, and RSPL, delivering
                  innovative renewable energy solutions across India. The
                  Company was the pioneer to execute Solar PV power plants for
                  renewable traction power along railway tracks Pan India. Also,
                  the Company has successfully commissioned a landmark 1 MWp
                  solar project with 2 MWh battery storage for the Indian Army
                  in the challenging terrain of Leh, Ladakh - demonstrating its
                  technical expertise and commitment to national sustainability
                  goals.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  National Renewable Targets
                </h3>
                <p>
                  With India's goal of achieving 280 GW of solar capacity by
                  2030, RRIL is proud to play a key role. The pipeline of
                  upcoming installations is strategically positioned to support
                  this national mission while delivering sustainable energy
                  solutions to communities across the country.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
