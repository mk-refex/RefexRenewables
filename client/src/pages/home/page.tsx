import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import SolarEnergy from './components/SolarEnergy';
import Clients from './components/Clients';
import Testimonials from './components/Testimonials';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;

        if (scrollPosition >= top && scrollPosition <= bottom) {
          setActiveSection(index);
        }
      });

      // Check if user has scrolled to bottom
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      // Fade out when within 300px of bottom
      if (distanceFromBottom < 300) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNextSection = () => {
    const nextIndex = (activeSection + 1) % sections.length;
    scrollToSection(sections[nextIndex].id);
  };

  const sections = [
    { label: 'HOME', id: 'hero', number: '1' },
    { label: 'ABOUT', id: 'about', number: '2' },
    { label: 'SERVICES', id: 'services', number: '3' },
    { label: 'SOLAR', id: 'solar-energy', number: '4' },
    { label: 'CLIENTS', id: 'clients', number: '5' },
    { label: 'TESTIMONIALS', id: 'testimonials', number: '6' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} />
      <Hero />
      <About />
      <Services />
      <SolarEnergy />
      <Clients />
      <Testimonials />
      <Footer />

      {/* Left Vertical Navigation */}
      <div className={`fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block transition-opacity duration-500 ${isNavVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="relative flex flex-col items-center">
          {/* Vertical Line - extends to touch the bottom button with extra at top */}
          <div className="absolute left-1/2 -translate-x-1/2 w-px bg-orange-500" style={{ top: '-20px', height: 'calc(100% - 20px)' }}></div>
          
          {sections.map((section, index) => (
            <div key={index} className="relative flex items-center mb-10 last:mb-0">
              {/* Number on the left - only show on active or hover with slide animation */}
              {(activeSection === index || hoveredSection === index) && (
                <span className="absolute right-[calc(100%+16px)] text-sm font-bold whitespace-nowrap text-black animate-slide-in-left">
                  {section.number}
                </span>
              )}
              
              {/* Square Button */}
              <button
                onClick={() => scrollToSection(section.id)}
                onMouseEnter={() => setHoveredSection(index)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`transition-all duration-300 cursor-pointer z-10 relative bg-orange-500 ${
                  activeSection === index || hoveredSection === index
                    ? 'w-3 h-3'
                    : 'w-2 h-2'
                }`}
              ></button>
              
              {/* Label on the right - only show on active or hover with slide animation */}
              {(activeSection === index || hoveredSection === index) && (
                <span className="absolute left-[calc(100%+16px)] text-black font-bold text-xs tracking-widest uppercase whitespace-nowrap animate-slide-in-right">
                  {section.label}
                </span>
              )}
            </div>
          ))}

          {/* Next Section Button */}
          <button
            onClick={scrollToNextSection}
            className="mt-4 w-10 h-10 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center cursor-pointer hover:bg-orange-500 transition-all duration-300 group"
          >
            <i className="ri-arrow-down-s-fill text-xl text-black group-hover:text-white w-6 h-6 flex items-center justify-center"></i>
          </button>
        </div>
      </div>

      {/* Phone Button - Hidden on mobile */}
      <div
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 cursor-pointer hidden lg:block"
        onMouseEnter={() => setIsPhoneHovered(true)}
        onMouseLeave={() => setIsPhoneHovered(false)}
        style={{
          width: isPhoneHovered ? '200px' : '60px',
        }}
      >
        <div className="bg-[#2D3748] text-white h-16 flex items-center justify-center shadow-lg">
          {isPhoneHovered ? (
            <a href="tel:18001020765" className="flex items-center gap-3 px-4">
              <i className="ri-phone-fill text-xl w-6 h-6 flex items-center justify-center"></i>
              <span className="font-semibold whitespace-nowrap">1800 102 0765</span>
            </a>
          ) : (
            <i className="ri-phone-fill text-2xl w-6 h-6 flex items-center justify-center"></i>
          )}
        </div>
      </div>

      {/* Contact Us Button - Hidden on mobile */}
      <div
        className="fixed right-0 top-1/2 translate-y-8 z-40 transition-all duration-300 cursor-pointer hidden lg:block"
        onMouseEnter={() => setIsContactHovered(true)}
        onMouseLeave={() => setIsContactHovered(false)}
        style={{
          width: isContactHovered ? '200px' : '60px',
        }}
      >
        <a href="/contact">
          <div className="bg-[#2D3748] text-white h-16 flex items-center justify-center shadow-lg">
            {isContactHovered ? (
              <div className="flex items-center gap-3 px-4">
                <i className="ri-mail-fill text-xl w-6 h-6 flex items-center justify-center"></i>
                <span className="font-semibold whitespace-nowrap">Contact Us</span>
              </div>
            ) : (
              <i className="ri-mail-fill text-2xl w-6 h-6 flex items-center justify-center"></i>
            )}
          </div>
        </a>
      </div>
    </div>
  );
}
