import Navigation from '../../components/Navigation';
import Hero from './components/Hero';
import LegalContent from './components/LegalContent';
import Footer from '../../components/Footer';

export default function LegalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <LegalContent />
      <Footer />
    </div>
  );
}
