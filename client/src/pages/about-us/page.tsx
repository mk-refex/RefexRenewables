import { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import Hero from './components/Hero';
import VisionMission from './components/VisionMission';
import AboutSlogan from './components/AboutSlogan';
import CompanyInfo from './components/CompanyInfo';
import Glimpse from './components/Glimpse';
import Presence from './components/Presence';
import Footer from '../../components/Footer';

export default function AboutUsPage() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'vision-mission', 'about-slogan', 'company-info', 'glimpse', 'presence'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} />
      <Hero />
      <VisionMission />
      <AboutSlogan />
      <CompanyInfo />
      <Glimpse />
      <Presence />
      <Footer />
    </div>
  );
}
