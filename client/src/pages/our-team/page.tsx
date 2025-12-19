import { useEffect } from 'react';
import Navigation from '../../components/Navigation';
import Hero from './components/Hero';
import TeamMembers from './components/TeamMembers';
import Footer from '../../components/Footer';

export default function OurTeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <TeamMembers />
      <Footer />
    </div>
  );
}
