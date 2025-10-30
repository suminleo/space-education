import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { auth } from '../lib/supabase';

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    memberType: 'free',
    agreeTerms: false,
    subscribeNewsletter: true
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert(t('auth.password_mismatch') || 'Passwords do not match');
      return;
    }

    if (!formData.agreeTerms) {
      alert(t('auth.agree_terms_required') || 'Please agree to terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await auth.signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.name,
        phone: formData.phone,
        memberType: formData.memberType,
        subscribeNewsletter: formData.subscribeNewsletter,
      });

      if (error) throw error;

      alert(t('auth.signup_success') || `Account created successfully! Welcome ${formData.name}`);
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.message || t('auth.signup_error') || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      <SEO
        title={t('auth.signup_title')}
        description="Join Soft Developer Club and start learning about space planning and development"
        keywords="signup, registration, membership, space education, Seoul"
      />

      <section className="section-padding bg-white min-h-screen flex items-center">
        <div className="container-custom max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-normal mb-8 text-center">{t('auth.signup_title')}</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm mb-2">{t('auth.name')}</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none"
                />
              </div>

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

              <div>
                <label className="block text-sm mb-2">{t('auth.confirm_password')}</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">{t('auth.phone')}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">{t('auth.member_type')}</label>
                <select
                  name="memberType"
                  value={formData.memberType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none"
                >
                  <option value="student">{t('membership.student.title')}</option>
                  <option value="free">{t('membership.free.title')}</option>
                  <option value="mentor">{t('membership.mentor.title')}</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    required
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-gray-700">{t('auth.agree_terms')}</span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onChange={handleChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-gray-700">{t('auth.subscribe_newsletter')}</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-dark w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (t('auth.signing_up') || 'Creating account...') : t('auth.signup')}
              </button>

              <p className="text-center text-sm text-gray-600">
                {t('auth.already_member')}{' '}
                <Link to="/login" className="text-gray-900 hover:underline">
                  {t('auth.login')}
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
