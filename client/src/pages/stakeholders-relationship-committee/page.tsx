import React from 'react';
import Navigation from '../../components/Navigation';
import Hero from './components/Hero';
import CommitteeMembers from './components/CommitteeMembers';
import Footer from '../../components/Footer';

const StakeholdersRelationshipCommitteePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <CommitteeMembers />
      <Footer />
    </div>
  );
};

export default StakeholdersRelationshipCommitteePage;
