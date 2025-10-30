import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { experts } from '../data/experts';

const ExpertDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const expert = experts.find((e) => e.id === id);

  if (!expert) {
    return (
      <div className="pt-16 section-padding">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-normal mb-8">{t('experts.not_found')}</h1>
          <Link to="/experts" className="btn-simple">
            {t('experts.back_to_list')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section-padding bg-white border-b border-gray-200">
        <div className="container-custom max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
              {/* Profile Image */}
              <div className="md:col-span-2">
                <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                  {expert.image && expert.image !== '/images/experts/yoon-jooseon.jpg' ? (
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-32 h-32 bg-gray-900 rounded-full flex items-center justify-center">
                        <span className="text-6xl font-normal text-white">
                          {expert.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="md:col-span-3">
                <p className="text-sm text-gray-500 mb-2">{expert.company}</p>
                <h1 className="text-4xl md:text-5xl font-normal mb-4">{expert.name}</h1>
                <p className="text-xl text-gray-600 mb-8">{expert.specialty}</p>
                <p className="text-base text-gray-600 leading-relaxed mb-8">
                  {expert.bio}
                </p>

                {/* Social Links */}
                {expert.social && (
                  <div className="flex gap-6 text-sm">
                    {expert.social.website && (
                      <a
                        href={expert.social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Website
                      </a>
                    )}
                    {expert.social.instagram && (
                      <a
                        href={expert.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interview & Articles */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-normal mb-8">{t('experts.interview_articles')}</h2>
            <div className="space-y-1">
              {expert.links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="block bg-white p-8 hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-normal mb-2">
                        {link.title}
                      </h3>
                      <p className="text-sm text-gray-500">{link.source}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back Link */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl text-center">
          <Link to="/experts" className="btn-simple">
            {t('experts.view_all')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ExpertDetail;
