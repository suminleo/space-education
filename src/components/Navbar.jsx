import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { auth } from '../lib/supabase';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const { data } = await auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
        setUser(data.session.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
      setUser(null);
      setIsOpen(false);
      navigate('/');
      alert(t('auth.logout_success') || 'Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      alert(t('auth.logout_error') || 'Failed to logout');
    }
  };

  const navItems = [
    { name: t('nav.about'), path: '/' },
    { name: t('nav.members'), path: '/experts' },
    { name: t('nav.programs'), path: '/curriculum' },
    { name: t('nav.membership'), path: '/membership' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.apply'), path: '/schedule' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50 top-0">
      <div className="container-custom">
        <div className="flex justify-between items-center py-6 px-6">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-normal text-gray-900 tracking-tight">
              {t('site.name')}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-normal transition-colors ${
                  location.pathname === item.path
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <LanguageSwitcher />
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-600">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {t('nav.logout') || 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="btn-dark text-sm px-6 py-2"
                >
                  {t('nav.signup')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 px-6 border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-3 text-sm font-normal transition-colors ${
                  location.pathname === item.path
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-3 border-t border-gray-200 mt-3">
              <LanguageSwitcher />
              {isLoggedIn ? (
                <>
                  <span className="text-sm text-gray-600">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-gray-900"
                  >
                    {t('nav.logout') || 'Logout'}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm text-gray-500 hover:text-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-dark text-sm px-6 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.signup')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
