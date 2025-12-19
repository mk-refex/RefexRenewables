import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Overview';
import ContentEditor from './components/ContentEditor';
import UserManagement from './components/UserManagement';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin-login');
      return;
    }

    // Check if user has permission to access the current tab
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const userPermissions = user.permissions;
        const userRole = user.role;

        // Admins (null permissions) can access everything
        if (userPermissions === null || userRole === 'admin') {
          return;
        }

        // Check if current tab is allowed
        // User Management is admin-only
        if (activeTab === 'user-management' && userRole !== 'admin') {
          setActiveTab('overview');
          return;
        }
        
        // Check permissions for all other tabs
        if (activeTab !== 'overview' && activeTab !== 'user-management') {
          if (!userPermissions.includes(activeTab)) {
            setActiveTab('overview');
          }
        }
      } catch (error) {
        console.error('Error checking permissions:', error);
      }
    }
  }, [navigate, activeTab]);

  // Scroll to top when activeTab changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Track page access in database
    if (activeTab && activeTab !== 'overview' && activeTab !== 'user-management') {
      const pageName = pageNameMap[activeTab] || activeTab;
      trackPageAccess(activeTab, pageName);
    }
  }, [activeTab]);

  const trackPageAccess = async (pageId: string, pageName: string) => {
    try {
      const token = localStorage.getItem('token');
      const API_URL = (import.meta as any).env?.VITE_API_URL || '';
      
      await fetch(`${API_URL}/api/page-access/track`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pageId, pageName }),
      });
    } catch (error) {
      console.error('Error tracking page access:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin-login');
  };

  const pageNameMap: Record<string, string> = {
    'home': 'Home',
    'about-us': 'About Us',
    'our-team': 'Our Team',
    'board-of-directors': 'Board of Directors',
    'audit-committee': 'Audit Committee',
    'nomination-remuneration-committee': 'Nomination & Remuneration Committee',
    'stakeholders-relationship-committee': 'Stakeholders Relationship Committee',
    'working-at-refex': 'Working at Refex',
    'investor-relations': 'Investor Relations',
    'why-go-solar': 'Why Go Solar',
    'cbg-production': 'CBG Production',
    'contact': 'Contact',
    'privacy-policy': 'Privacy Policy',
    'terms-conditions': 'Terms & Conditions',
    'legal-disclaimer': 'Legal Disclaimer',
    'header': 'Header (Global)',
    'footer': 'Footer (Global)',
  };

  return (
    <div className="admin-dashboard-wrapper min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header onLogout={handleLogout} />
        
        <main ref={mainRef} className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'overview' && <Overview onEditPage={(pageName) => {
            const pageId = Object.keys(pageNameMap).find(key => pageNameMap[key] === pageName);
            if (pageId) setActiveTab(pageId);
          }} />}
          {activeTab === 'user-management' && <UserManagement />}
          {activeTab !== 'overview' && activeTab !== 'user-management' && <ContentEditor selectedPage={pageNameMap[activeTab]} />}
        </main>
      </div>
    </div>
  );
}
