import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
  role: 'admin' | 'user';
  permissions?: string[] | null;
  createdAt: string;
}

interface FrontendUser extends Omit<User, 'role'> {
  type: 'Admin' | 'Editor' | 'Viewer';
  active: boolean;
  permissions?: string[] | null;
}

const API_URL = import.meta.env.VITE_API_URL || '';

// Map backend role to frontend type
const roleToType = (role: 'admin' | 'user'): 'Admin' | 'Editor' | 'Viewer' => {
  return role === 'admin' ? 'Admin' : 'Editor';
};

// Map frontend type to backend role
const typeToRole = (type: 'Admin' | 'Editor' | 'Viewer'): 'admin' | 'user' => {
  return type === 'Admin' ? 'admin' : 'user'; // Both Editor and Viewer map to 'user' role
};

// Convert backend user to frontend user
const toFrontendUser = (user: User): FrontendUser => {
  return {
    ...user,
    type: roleToType(user.role),
    active: true, // All users are active by default
    permissions: user.permissions,
  };
};

// Available menu items for permissions (excluding admin-only items)
const availableMenuItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'header', label: 'Header (Global)' },
  { id: 'footer', label: 'Footer (Global)' },
  { id: 'home', label: 'Home' },
  { id: 'about-us', label: 'About Us' },
  { id: 'our-team', label: 'Our Team' },
  { id: 'board-of-directors', label: 'Board of Directors' },
  { id: 'audit-committee', label: 'Audit Committee' },
  { id: 'nomination-remuneration-committee', label: 'Nomination & Remuneration' },
  { id: 'stakeholders-relationship-committee', label: 'Stakeholders Relationship' },
  { id: 'working-at-refex', label: 'Working at Refex' },
  { id: 'investor-relations', label: 'Investor Relations' },
  { id: 'why-go-solar', label: 'Why Go Solar' },
  { id: 'cbg-production', label: 'CBG Production' },
  { id: 'contact', label: 'Contact' },
  { id: 'privacy-policy', label: 'Privacy Policy' },
  { id: 'terms-conditions', label: 'Terms & Conditions' },
  { id: 'legal-disclaimer', label: 'Legal Disclaimer' },
];

export default function UserManagement() {
  const [users, setUsers] = useState<FrontendUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<FrontendUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Admin' | 'Editor' | 'Viewer'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Editor' as 'Admin' | 'Editor' | 'Viewer',
    password: '',
    permissions: [] as string[],
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data: User[] = await response.json();
      setUsers(data.map(toFrontendUser));
    } catch (err) {
      setError('Failed to load users. Please try again.');
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Open create modal
  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      name: '',
      email: '',
      type: 'Editor',
      password: '',
      permissions: [],
    });
    setError('');
    setShowModal(true);
  };

  // Open edit modal
  const handleEdit = (user: FrontendUser) => {
    setModalMode('edit');
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      type: user.type,
      password: '',
      permissions: user.permissions || [],
    });
    setError('');
    setShowModal(true);
  };

  // Toggle permission
  const togglePermission = (permissionId: string) => {
    if (formData.type === 'Admin') return; // Admins have all permissions
    
    setFormData({
      ...formData,
      permissions: formData.permissions.includes(permissionId)
        ? formData.permissions.filter((p) => p !== permissionId)
        : [...formData.permissions, permissionId],
    });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const role = typeToRole(formData.type);

      if (modalMode === 'create') {
        if (!formData.password) {
          setError('Password is required');
          setSubmitting(false);
          return;
        }
        if (formData.type !== 'Admin' && formData.permissions.length === 0) {
          setError('At least one permission is required for non-admin users');
          setSubmitting(false);
          return;
        }

        const response = await fetch(`${API_URL}/api/users`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role,
            permissions: role === 'admin' ? null : formData.permissions,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to create user');
        }

        await fetchUsers();
        setShowModal(false);
        setSelectedUser(null);
      } else if (modalMode === 'edit' && selectedUser) {
        const updateData: any = {
          name: formData.name,
          email: formData.email,
          role,
          permissions: role === 'admin' ? null : formData.permissions,
        };

        // Only include password if provided
        if (formData.password) {
          updateData.password = formData.password;
        }

        const response = await fetch(`${API_URL}/api/users/${selectedUser.id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to update user');
        }

        await fetchUsers();
        setShowModal(false);
        setSelectedUser(null);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete user
  const handleDelete = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete user');
      }

      await fetchUsers();
    } catch (err: any) {
      alert(err.message || 'Failed to delete user');
    }
  };

  // Toggle active status (placeholder - not implemented in backend yet)
  const handleToggleActive = (_userId: number) => {
    // This would require an active/inactive field in the database
    // For now, we'll just show a message
    alert('Active status toggle not yet implemented');
  };

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || user.type === filterType;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && user.active) ||
      (filterStatus === 'inactive' && !user.active);

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="ri-user-settings-line text-white text-xl"></i>
            </div>
            <div>
              <p className="text-xs text-orange-100 font-medium uppercase tracking-wide">
                Admin Panel
              </p>
              <h2 className="text-2xl font-bold text-white">User Management</h2>
            </div>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-gray-100 text-orange-600 rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium text-sm"
          >
            <i className="ri-user-add-line"></i>
            Create User
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Filter by Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          {/* Filter by Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="px-6 py-12 text-center">
            <i className="ri-loader-4-line text-4xl text-orange-500 mb-3 animate-spin"></i>
            <p className="text-gray-500 font-medium">Loading users...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permissions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <i className="ri-user-line text-4xl text-gray-400 mb-3"></i>
                        <p className="text-gray-500 font-medium">No users found</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {searchQuery || filterType !== 'all' || filterStatus !== 'all'
                            ? 'Try adjusting your filters'
                            : 'Create your first user to get started'}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-orange-600 font-bold text-sm">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.type === 'Admin'
                                ? 'bg-red-100 text-red-800'
                                : user.type === 'Editor'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {user.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {user.type === 'Admin' ? (
                            <span className="text-xs text-gray-500 italic">All pages</span>
                          ) : user.permissions && user.permissions.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {user.permissions.slice(0, 3).map((permId) => {
                                const perm = availableMenuItems.find((p) => p.id === permId);
                                return perm ? (
                                  <span
                                    key={permId}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800"
                                  >
                                    {perm.label}
                                  </span>
                                ) : null;
                              })}
                              {user.permissions.length > 3 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                  +{user.permissions.length - 3} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 italic">No permissions</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleActive(user.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                              user.active
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                user.active ? 'bg-green-500' : 'bg-gray-500'
                              }`}
                            ></span>
                            {user.active ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(user)}
                              className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                              title="Edit User"
                            >
                              <i className="ri-edit-line text-lg"></i>
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                              title="Delete User"
                            >
                              <i className="ri-delete-bin-line text-lg"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Table Footer */}
        {filteredUsers.length > 0 && (
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredUsers.length}</span> of{' '}
              <span className="font-medium">{users.length}</span> users
            </p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full my-8 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 rounded-t-lg flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">
                  {modalMode === 'create' ? 'Create New User' : 'Edit User'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Modal Body - Scrollable */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  required
                  disabled={submitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                  required
                  disabled={submitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => {
                    const newType = e.target.value as typeof formData.type;
                    setFormData({
                      ...formData,
                      type: newType,
                      // Reset permissions if changing to Admin
                      permissions: newType === 'Admin' ? [] : formData.permissions,
                    });
                  }}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm cursor-pointer disabled:opacity-50"
                >
                  <option value="Admin">Admin - Full access</option>
                  <option value="Editor">Editor - Can edit content</option>
                  <option value="Viewer">Viewer - Read only (maps to user role)</option>
                </select>
              </div>

              {formData.type !== 'Admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Permissions <span className="text-red-500">*</span>
                    <span className="text-gray-500 text-xs font-normal ml-2">
                      Select which pages this user can access
                    </span>
                  </label>
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 max-h-64 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {availableMenuItems.map((item) => (
                        <label
                          key={item.id}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(item.id)}
                            onChange={() => togglePermission(item.id)}
                            disabled={submitting}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer disabled:opacity-50"
                          />
                          <span className="text-sm text-gray-700">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {formData.permissions.length === 0 && (
                    <p className="text-xs text-red-500 mt-2">At least one permission is required for non-admin users</p>
                  )}
                  {formData.permissions.length > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                      {formData.permissions.length} permission(s) selected
                    </p>
                  )}
                </div>
              )}
              
              {formData.type === 'Admin' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <i className="ri-information-line mr-2"></i>
                    Admin users have access to all pages automatically.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password {modalMode === 'create' && <span className="text-red-500">*</span>}
                  {modalMode === 'edit' && (
                    <span className="text-gray-500 text-xs ml-1">(leave blank to keep current)</span>
                  )}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={modalMode === 'create' ? 'Enter password' : 'Enter new password (optional)'}
                  required={modalMode === 'create'}
                  disabled={submitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm disabled:opacity-50"
                />
              </div>

              </div>
              
              {/* Modal Footer - Always Visible */}
              <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-gray-200 bg-gray-50 rounded-b-lg flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap text-sm font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap text-sm font-medium disabled:opacity-50"
                >
                  {submitting
                    ? 'Processing...'
                    : modalMode === 'create'
                    ? 'Create User'
                    : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="ri-information-line text-white"></i>
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-2">User Management Information</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Admin</strong> - Full access to all features and settings</li>
              <li>• <strong>Editor</strong> - Can create and edit content, but cannot manage users</li>
              <li>• <strong>Viewer</strong> - Read-only access (maps to user role in database)</li>
              <li>• All user data is stored in the database</li>
              <li>• Users can be created, edited, and deleted from this interface</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
