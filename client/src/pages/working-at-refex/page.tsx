import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation';
import Hero from './components/Hero';
import WorkingContent from './components/WorkingContent';
import Footer from '../../components/Footer';

export default function WorkingAtRefexPage() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} />
      <Hero />
      <WorkingContent />
      <Footer />
    </div>
  );
}
