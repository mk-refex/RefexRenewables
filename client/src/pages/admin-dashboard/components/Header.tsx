interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Refex Renewables Website</h2>
          <p className="text-sm text-gray-600 mt-1">Content Management</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => window.open('/', '_blank')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-external-link-line"></i>
            View Website
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap text-sm font-medium"
          >
            <i className="ri-logout-box-line"></i>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
