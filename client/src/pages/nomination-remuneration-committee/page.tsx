import Hero from './components/Hero';
import Navigation from '../../components/Navigation';
import CommitteeMembers from './components/CommitteeMembers';
import Footer from '../../components/Footer';

export default function NominationRemunerationCommitteePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <CommitteeMembers />
      <Footer />
    </div>
  );
}
