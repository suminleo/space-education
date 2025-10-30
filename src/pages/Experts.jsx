import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getRandomizedExperts } from '../data/experts';

const Experts = () => {
  const { t } = useTranslation();
  const experts = getRandomizedExperts();

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="section-padding bg-white border-b border-gray-200">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-normal mb-6">{t('experts.title')}</h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {t('experts.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {experts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
              >
                <Link to={`/experts/${expert.id}`} className="block group">
                  <div className="relative aspect-[4/5] bg-gray-200 overflow-hidden">
                    {expert.image && expert.image !== '/images/experts/yoon-jooseon.jpg' ? (
                      <img
                        src={expert.image}
                        alt={expert.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center">
                          <span className="text-4xl font-normal text-white">
                            {expert.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-normal mb-2">{expert.name}</h3>
                      <p className="text-sm text-white/80 mb-3">{expert.company}</p>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {expert.specialty}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experts;
