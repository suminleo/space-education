import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const WriteArticle = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expertInfo, setExpertInfo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Get token from URL
    const token = searchParams.get('token');

    if (!token) {
      setLoading(false);
      return;
    }

    // Validate token (실제로는 API 호출)
    const tokens = JSON.parse(localStorage.getItem('writeTokens') || '[]');
    const validToken = tokens.find(t => t.token === token && !t.used);

    if (validToken) {
      setIsValidToken(true);
      setExpertInfo({
        name: validToken.expertName,
        token: validToken.token
      });
    }

    setLoading(false);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Create article object
      const article = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        author: expertInfo.name,
        createdAt: new Date().toISOString(),
        published: true
      };

      // Save to localStorage (실제로는 API 호출)
      const articles = JSON.parse(localStorage.getItem('articles') || '[]');
      articles.push(article);
      localStorage.setItem('articles', JSON.stringify(articles));

      // Mark token as used
      const tokens = JSON.parse(localStorage.getItem('writeTokens') || '[]');
      const updatedTokens = tokens.map(t =>
        t.token === expertInfo.token ? { ...t, used: true } : t
      );
      localStorage.setItem('writeTokens', JSON.stringify(updatedTokens));

      // Show success message
      alert(t('writeArticle.success'));

      // Redirect to blog
      navigate('/blog');
    } catch (error) {
      console.error('Error submitting article:', error);
      alert(t('writeArticle.error'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">{t('writeArticle.loading')}</p>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-normal mb-6">{t('writeArticle.invalid_link')}</h1>
          <p className="text-lg text-gray-600 mb-8">
            {t('writeArticle.invalid_desc')}
            <br />
            {t('writeArticle.invalid_contact')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="section-padding bg-white min-h-screen">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <h1 className="text-4xl font-normal mb-4">{t('writeArticle.title')}</h1>
              <p className="text-lg text-gray-600">
                {t('writeArticle.greeting')}, {expertInfo.name}님
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('writeArticle.title_label')}
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
                  placeholder={t('writeArticle.title_placeholder')}
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('writeArticle.content_label')}
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={20}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors resize-none"
                  placeholder={t('writeArticle.content_placeholder')}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-dark flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? t('writeArticle.submitting') : t('writeArticle.submit')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WriteArticle;
