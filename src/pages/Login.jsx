import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { auth } from '../lib/supabase';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await auth.signIn({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      alert(t('auth.login_success') || `Welcome back!`);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || t('auth.login_error') || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      <SEO
        title={t('auth.login_title')}
        description="Login to Soft Developer Club"
        keywords="login, signin, member, space education"
      />

      <section className="section-padding bg-white min-h-screen flex items-center">
        <div className="container-custom max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-normal mb-8 text-center">{t('auth.login_title')}</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{t('auth.email')}</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">{t('auth.password')}</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <Link to="/forgot-password" className="text-gray-600 hover:text-gray-900">
                  {t('auth.forgot_password')}
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-dark w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (t('auth.logging_in') || 'Logging in...') : t('auth.login')}
              </button>

              <p className="text-center text-sm text-gray-600">
                {t('auth.not_member')}{' '}
                <Link to="/signup" className="text-gray-900 hover:underline">
                  {t('auth.signup')}
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Login;
