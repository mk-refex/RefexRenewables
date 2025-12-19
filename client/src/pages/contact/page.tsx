import { useEffect } from 'react';
import Navigation from '../../components/Navigation';
import Hero from './components/Hero';
import ContactDetails from './components/ContactDetails';
import Footer from '../../components/Footer';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <ContactDetails />
      <Footer />
    </div>
  );
}
