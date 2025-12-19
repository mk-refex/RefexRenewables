import { useEffect } from 'react';
import Navigation from '../../components/Navigation';
import Hero from './components/Hero';
import BoardMembers from './components/BoardMembers';
import Footer from '../../components/Footer';

export default function BoardOfDirectorsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <BoardMembers />
      <Footer />
    </div>
  );
}
