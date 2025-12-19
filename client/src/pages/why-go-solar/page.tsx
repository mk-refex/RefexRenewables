
import { useEffect } from 'react';
import Navigation from '../../components/Navigation';
import Hero from './components/Hero';
import SolarContent from './components/SolarContent';
import Footer from '../../components/Footer';

export default function WhyGoSolarPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <SolarContent />
      <Footer />
    </div>
  );
}
