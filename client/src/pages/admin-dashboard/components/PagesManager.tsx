interface PagesManagerProps {
  onEditPage: (pageName: string) => void;
}

export default function PagesManager({ onEditPage }: PagesManagerProps) {
  const pages = [
    { name: 'Home', path: '/', sections: 8, status: 'Published' },
    { name: 'About Us', path: '/about-us', sections: 7, status: 'Published' },
    { name: 'Our Team', path: '/our-team', sections: 3, status: 'Published' },
    { name: 'Board of Directors', path: '/board-of-directors', sections: 3, status: 'Published' },
    { name: 'Audit Committee', path: '/audit-committee', sections: 3, status: 'Published' },
    { name: 'Nomination & Remuneration Committee', path: '/nomination-remuneration-committee', sections: 3, status: 'Published' },
    { name: 'Stakeholders Relationship Committee', path: '/stakeholders-relationship-committee', sections: 3, status: 'Published' },
    { name: 'Working at Refex', path: '/working-at-refex', sections: 3, status: 'Published' },
    { name: 'Investor Relations', path: '/investor-relations', sections: 3, status: 'Published' },
    { name: 'Why Go Solar', path: '/why-go-solar', sections: 3, status: 'Published' },
    { name: 'CBG Production', path: '/cbg-production', sections: 3, status: 'Published' },
    { name: 'Contact', path: '/contact', sections: 3, status: 'Published' },
    { name: 'Privacy Policy', path: '/privacy-policy', sections: 3, status: 'Published' },
    { name: 'Terms & Conditions', path: '/terms-conditions', sections: 3, status: 'Published' },
    { name: 'Legal Disclaimer', path: '/legal-disclaimer', sections: 3, status: 'Published' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Pages Manager</h3>
          <p className="text-sm text-gray-600 mt-1">Manage all website pages and their content</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Page Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Path
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Sections
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pages.map((page, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <i className="ri-file-text-line text-orange-500 text-sm"></i>
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{page.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{page.path}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{page.sections}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => window.open(page.path, '_blank')}
                        className="p-2 text-gray-600 hover:text-orange-500 transition-colors cursor-pointer"
                        title="View Page"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => onEditPage(page.name)}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap text-sm font-medium"
                      >
                        Edit Content
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
