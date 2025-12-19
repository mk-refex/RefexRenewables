import { useState, useEffect } from 'react';

interface OverviewProps {
  onEditPage: (pageName: string) => void;
}

interface OverviewData {
  stats: {
    totalPages: number;
    published: number;
    totalSections: number;
    activeToday: number;
  };
  recentPages: Array<{
    id: string;
    name: string;
    accessedAt: string;
  }>;
}

const API_URL = (import.meta as any).env?.VITE_API_URL || '';

export default function Overview({ onEditPage }: OverviewProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState('');
  const [recentPages, setRecentPages] = useState<Array<{ id: string; name: string; accessedAt: string }>>([]);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/overview`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch overview data');
      }

      const overviewData = await response.json();
      setData(overviewData);
      setRecentPages(overviewData.recentPages || []);
    } catch (err: any) {
      setError('Failed to load overview data');
      console.error('Fetch overview error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-orange-500 mb-3 animate-spin"></i>
          <p className="text-gray-500">Loading overview...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">{error || 'Failed to load overview data'}</p>
      </div>
    );
  }

  const formatTimeAgo = (dateString: string) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-orange-500 mb-3 animate-spin"></i>
          <p className="text-gray-500">Loading overview...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">{error || 'Failed to load overview data'}</p>
      </div>
    );
  }

  const stats = [
    { label: 'Total Pages', value: data.stats.totalPages.toString(), icon: 'ri-pages-line', color: 'bg-blue-500' },
    { label: 'Published', value: data.stats.published.toString(), icon: 'ri-checkbox-circle-line', color: 'bg-green-500' },
    { label: 'Active Users Today', value: data.stats.activeToday.toString(), icon: 'ri-user-line', color: 'bg-orange-500' },
    { label: 'Total Sections', value: `${data.stats.totalSections}+`, icon: 'ri-layout-grid-line', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <i className={`${stat.icon} text-white text-xl`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {recentPages.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h4 className="text-lg font-bold text-gray-900">Recent Pages</h4>
            <p className="text-sm text-gray-600 mt-1">Pages you've recently accessed</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentPages.map((page) => (
                <div key={page.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <i className="ri-file-text-line text-orange-500"></i>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{page.name}</h5>
                      <p className="text-sm text-gray-500">Accessed {formatTimeAgo(page.accessedAt)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onEditPage(page.name)}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap text-sm font-medium"
                  >
                    Edit Content
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
