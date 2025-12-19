import { useState } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Hero from './components/Hero';
import InvestorContent from './components/InvestorContent';

export default function InvestorRelationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <InvestorContent />
      <Footer />
    </div>
  );
}
