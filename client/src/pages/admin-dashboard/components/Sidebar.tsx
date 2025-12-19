import { useState, useEffect } from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [userPermissions, setUserPermissions] = useState<string[] | null>(null);
  const [userRole, setUserRole] = useState<string>('user');

  useEffect(() => {
    // Get user permissions from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserRole(user.role || 'user');
        // null permissions means admin (full access), array means specific permissions
        setUserPermissions(user.permissions);
      } catch (error) {
        setUserPermissions([]);
      }
    }
  }, []);

  const allMenuItems = [
    { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
    { id: 'user-management', label: 'User Management', icon: 'ri-user-settings-line', adminOnly: true },
    { id: 'header', label: 'Header (Global)', icon: 'ri-layout-top-line' },
    { id: 'footer', label: 'Footer (Global)', icon: 'ri-layout-bottom-line' },
    { id: 'home', label: 'Home', icon: 'ri-home-line' },
    { id: 'about-us', label: 'About Us', icon: 'ri-information-line' },
    { id: 'our-team', label: 'Our Team', icon: 'ri-team-line' },
    { id: 'board-of-directors', label: 'Board of Directors', icon: 'ri-user-star-line' },
    { id: 'audit-committee', label: 'Audit Committee', icon: 'ri-file-list-3-line' },
    { id: 'nomination-remuneration-committee', label: 'Nomination & Remuneration', icon: 'ri-award-line' },
    { id: 'stakeholders-relationship-committee', label: 'Stakeholders Relationship', icon: 'ri-group-line' },
    { id: 'working-at-refex', label: 'Working at Refex', icon: 'ri-briefcase-line' },
    { id: 'investor-relations', label: 'Investor Relations', icon: 'ri-line-chart-line' },
    { id: 'why-go-solar', label: 'Why Go Solar', icon: 'ri-sun-line' },
    { id: 'cbg-production', label: 'CBG Production', icon: 'ri-plant-line' },
    { id: 'contact', label: 'Contact', icon: 'ri-mail-line' },
    { id: 'privacy-policy', label: 'Privacy Policy', icon: 'ri-shield-check-line' },
    { id: 'terms-conditions', label: 'Terms & Conditions', icon: 'ri-file-text-line' },
    { id: 'legal-disclaimer', label: 'Legal Disclaimer', icon: 'ri-error-warning-line' },
  ];

  // Filter menu items based on permissions
  // null permissions = admin (all access), array = specific permissions
  const menuItems = allMenuItems.filter((item) => {
    // Admins (null permissions) see everything
    if (userPermissions === null || userRole === 'admin') {
      return true;
    }
    // Regular users only see items in their permissions array
    return userPermissions.includes(item.id);
  });

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-gray-800 flex items-center justify-center">
        <img 
          src="https://refexrenewables.com/img/logo.png" 
          alt="Refex Renewables" 
          className="h-[50px] w-auto"
        />
      </div>

      <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 hover:scrollbar-thumb-gray-600">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <i className={`${item.icon} text-lg w-5 h-5 flex items-center justify-center`}></i>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        {(() => {
          const userStr = localStorage.getItem('user');
          const user = userStr ? JSON.parse(userStr) : null;
          return (
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <i className="ri-user-line text-white"></i>
              </div>
              <div>
                <p className="text-sm font-medium">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-400">
                  {user?.role === 'admin' ? 'Administrator' : 'User'}
                </p>
              </div>
            </div>
          );
        })()}
      </div>
    </aside>
  );
}
