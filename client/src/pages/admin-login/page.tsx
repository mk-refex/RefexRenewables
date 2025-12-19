import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Use relative path since server and client are on same domain in production
      const API_URL = (import.meta as any).env?.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Invalid email or password');
        setLoading(false);
        return;
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isAdminLoggedIn', 'true');
      
      navigate('/admin-dashboard');
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image (2/3 width) */}
      <div className="hidden lg:flex lg:w-2/3 relative">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Modern%20sustainable%20energy%20facility%20with%20solar%20panels%20and%20green%20technology%20infrastructure%2C%20clean%20professional%20corporate%20environment%20with%20blue%20sky%2C%20minimalist%20industrial%20architecture%20showcasing%20renewable%20energy%20innovation%20and%20environmental%20responsibility%2C%20bright%20daylight%20photography%20with%20geometric%20patterns&width=800&height=1080&seq=admin-login-left&orientation=portrait"
            alt="Refex Energy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-transparent to-black/50"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-end p-16 text-white">
          <div>
            <div className="w-20 h-1 bg-orange-500 mb-8"></div>
            <h2 className="text-5xl font-bold mb-4 leading-tight">Welcome to Refex Renewables & Infrastructure Limited</h2>
            <p className="text-xl text-white/90">Powering a sustainable future with clean energy solutions</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form (1/3 width) */}
      <div className="w-full lg:w-1/3 flex flex-col px-4 py-12 bg-white">
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
          {/* Logo - Centered at Top */}
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="ri-shield-user-line text-white text-3xl"></i>
              </div>
            </div>
            <div>
              <h1 className="text-xl m-0 font-bold text-gray-900 leading-tight mb-1">Refex Renewables & Infrastructure Limited</h1>
              <p className="text-sm text-orange-500 font-semibold">Admin Portal</p>
            </div>
          </div>

          {/* Login Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign In</h2>
            <p className="text-gray-500 text-sm mb-8">Enter your credentials to continue</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-3">
                <i className="ri-error-warning-line text-red-500 text-lg mt-0.5 flex-shrink-0"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-mail-line text-gray-400"></i>
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm"
                    placeholder="admin@refex.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-lock-line text-gray-400"></i>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <i className="ri-eye-off-line text-lg"></i>
                    ) : (
                      <i className="ri-eye-line text-lg"></i>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <i className="ri-arrow-right-line"></i>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-sm text-gray-500 hover:text-orange-500 transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <i className="ri-arrow-left-line"></i>
                Back to Website
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
