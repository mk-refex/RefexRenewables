import Navigation from '../../components/Navigation';
import Hero from './components/Hero';
import PrivacyContent from './components/PrivacyContent';
import Footer from '../../components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <PrivacyContent />
      <Footer />
    </div>
  );
}
