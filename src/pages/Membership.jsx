import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const Membership = () => {
  const { t } = useTranslation();

  const plans = [
    {
      id: 'student',
      icon: '📚',
      features: t('membership.student.features', { returnObjects: true })
    },
    {
      id: 'free',
      icon: '🌱',
      features: t('membership.free.features', { returnObjects: true })
    },
    {
      id: 'mentor',
      icon: '⭐',
      features: t('membership.mentor.features', { returnObjects: true }),
      highlighted: true
    }
  ];

  return (
    <div className="pt-16">
      <SEO
        title={t('membership.title')}
        description={t('membership.subtitle')}
        keywords="membership, mentor, space education, consulting, Seoul, 멤버십, 멘토, 공간 교육"
      />

      {/* Header */}
      <section className="section-padding bg-white border-b border-gray-200">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-normal mb-6">{t('membership.title')}</h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {t('membership.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-gray-200">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white p-8 ${plan.highlighted ? 'md:scale-105 z-10 shadow-xl' : ''}`}
              >
                <div className="text-center mb-8">
                  <div className="text-5xl mb-4">{plan.icon}</div>
                  <h2 className="text-2xl font-normal mb-2">{t(`membership.${plan.id}.title`)}</h2>
                  <p className="text-3xl font-normal text-gray-900 mb-4">
                    {t(`membership.${plan.id}.price`)}
                  </p>
                  {plan.id === 'mentor' && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t('membership.mentor.description')}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <svg className="w-5 h-5 text-gray-900 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`w-full text-center py-3 block transition-colors ${
                    plan.highlighted
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  {t('membership.join')}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-normal mb-4">{t('newsletter.title')}</h2>
            <p className="text-lg text-gray-600 mb-8">{t('newsletter.description')}</p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none"
              />
              <button type="submit" className="btn-dark px-6 py-3">
                {t('newsletter.subscribe')}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
