import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { auth, db } from '../lib/supabase';

const Blog = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndLoadArticles = async () => {
      try {
        // Check if user is logged in via Supabase Auth
        const { data: session } = await auth.getSession();
        const loggedIn = !!session.session;
        setIsLoggedIn(loggedIn);

        if (loggedIn) {
          // Load articles from Supabase
          const { data, error } = await db.getArticles();
          if (error) throw error;
          setArticles(data || []);
        }
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndLoadArticles();
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="pt-16">
        <SEO title={t('blog.title')} description={t('blog.members_only_desc')} />
        <section className="section-padding bg-white min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-normal mb-6">{t('blog.members_only')}</h1>
            <p className="text-lg text-gray-600 mb-8">
              {t('blog.members_only_desc')}
              <br />
              {t('blog.login_or_signup')}
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/login" className="btn-simple">
                {t('auth.login')}
              </Link>
              <Link to="/signup" className="btn-dark">
                {t('auth.signup')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <SEO
        title={t('blog.title')}
        description={t('blog.subtitle')}
        keywords="공간 기획, 인사이트, 블로그, 전문가, space planning, Seoul, architecture"
      />

      {/* Header */}
      <section className="section-padding bg-white border-b border-gray-200">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-normal mb-6">{t('blog.title')}</h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {t('blog.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t('blog.no_articles')}</p>
            </div>
          ) : (
            <div className="space-y-12">
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                      <span className="text-white font-normal text-lg">
                        {article.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{article.author}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-normal mb-4">{article.title}</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {article.content.substring(0, 300)}
                      {article.content.length > 300 && '...'}
                    </p>
                  </div>

                  {article.content.length > 300 && (
                    <Link
                      to={`/blog/${article.id}`}
                      className="inline-block mt-4 text-gray-900 hover:underline"
                    >
                      {t('blog.read_more')} →
                    </Link>
                  )}
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-2xl text-center">
          <h2 className="text-3xl font-normal mb-4">{t('blog.newsletter_title')}</h2>
          <p className="text-lg text-gray-600 mb-8">
            {t('blog.newsletter_subtitle')}
          </p>
          <div className="text-sm text-gray-500">
            {t('blog.newsletter_note')}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
