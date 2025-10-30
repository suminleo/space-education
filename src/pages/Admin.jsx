import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { experts } from '../data/experts';
import { getWeeklyArticles, sendNewsletter } from '../utils/newsletter';

const Admin = () => {
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedExperts, setSelectedExperts] = useState([]);
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [articles, setArticles] = useState([]);
  const [weeklyArticles, setWeeklyArticles] = useState([]);
  const [sendingNewsletter, setSendingNewsletter] = useState(false);

  useEffect(() => {
    // Check admin status
    const adminAuth = sessionStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      setIsAdmin(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    // Load existing tokens and articles
    const tokens = JSON.parse(localStorage.getItem('writeTokens') || '[]');
    setGeneratedLinks(tokens);

    const savedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
    setArticles(savedArticles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

    // Load weekly articles
    const weekly = getWeeklyArticles();
    setWeeklyArticles(weekly);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check (실제로는 서버 인증)
    if (password === 'admin1234') {
      sessionStorage.setItem('adminAuth', 'true');
      setIsAdmin(true);
      loadData();
    } else {
      alert(t('admin.password_placeholder'));
    }
  };

  const handleExpertToggle = (expertId) => {
    setSelectedExperts(prev =>
      prev.includes(expertId)
        ? prev.filter(id => id !== expertId)
        : [...prev, expertId]
    );
  };

  const generateTokens = () => {
    if (selectedExperts.length === 0) {
      alert(t('admin.select_experts'));
      return;
    }

    const newTokens = selectedExperts.map(expertId => {
      const expert = experts.find(e => e.id === expertId);
      return {
        token: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        expertId: expert.id,
        expertName: expert.name,
        createdAt: new Date().toISOString(),
        used: false
      };
    });

    // Save to localStorage (실제로는 API 호출)
    const existingTokens = JSON.parse(localStorage.getItem('writeTokens') || '[]');
    const updatedTokens = [...existingTokens, ...newTokens];
    localStorage.setItem('writeTokens', JSON.stringify(updatedTokens));

    setGeneratedLinks(updatedTokens);
    setSelectedExperts([]);
    alert(t('admin.link_copied'));
  };

  const copyLink = (token) => {
    const link = `${window.location.origin}/write?token=${token}`;
    navigator.clipboard.writeText(link);
    alert(t('admin.link_copied'));
  };

  const deleteArticle = (articleId) => {
    if (!confirm(t('admin.delete_confirm'))) {
      return;
    }

    const updatedArticles = articles.filter(a => a.id !== articleId);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
    loadData(); // Reload to update weekly articles
  };

  const handleSendNewsletter = async () => {
    if (weeklyArticles.length === 0) {
      alert(t('admin.no_articles_week'));
      return;
    }

    if (!confirm(`${weeklyArticles.length}${t('admin.send_confirm')}`)) {
      return;
    }

    setSendingNewsletter(true);

    try {
      const result = await sendNewsletter();
      alert(`${t('admin.newsletter_sent').replace('명', `${result.subscribersCount}명`)}`);

      // 개발 환경에서 HTML 미리보기
      if (process.env.NODE_ENV === 'development') {
        const previewWindow = window.open('', '_blank');
        previewWindow.document.write(result.html);
        previewWindow.document.close();
      }
    } catch (error) {
      console.error('Newsletter send error:', error);
      alert(t('admin.newsletter_failed'));
    } finally {
      setSendingNewsletter(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 border border-gray-200 w-full max-w-md">
          <h1 className="text-3xl font-normal mb-6">{t('admin.login_title')}</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('admin.password_placeholder')}
              className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none mb-4"
            />
            <button type="submit" className="btn-dark w-full">
              {t('auth.login')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="section-padding bg-white border-b border-gray-200">
        <div className="container-custom max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-normal mb-2">{t('admin.title')}</h1>
            <p className="text-lg text-gray-600">{t('admin.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Generate Links Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-6xl">
          <h2 className="text-2xl font-normal mb-6">{t('admin.generate_links')}</h2>

          <div className="bg-white p-8 border border-gray-200 mb-8">
            <h3 className="text-lg font-medium mb-4">{t('admin.select_experts')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {experts.map(expert => (
                <label
                  key={expert.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedExperts.includes(expert.id)}
                    onChange={() => handleExpertToggle(expert.id)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{expert.name}</span>
                </label>
              ))}
            </div>
            <button
              onClick={generateTokens}
              className="btn-dark"
            >
              {t('admin.generate_button')}
            </button>
          </div>

          {/* Generated Links */}
          <div className="bg-white p-8 border border-gray-200">
            <h3 className="text-lg font-medium mb-4">{t('admin.generated_links')}</h3>
            {generatedLinks.length === 0 ? (
              <p className="text-gray-500">{t('admin.no_links')}</p>
            ) : (
              <div className="space-y-4">
                {generatedLinks.map((link, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 border ${
                      link.used ? 'bg-gray-50 border-gray-200' : 'border-gray-300'
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-medium">{link.expertName}</p>
                      <p className="text-sm text-gray-500">
                        {t('admin.created')}: {new Date(link.createdAt).toLocaleDateString('ko-KR')}
                        {link.used && ` • ${t('admin.used')}`}
                      </p>
                    </div>
                    <button
                      onClick={() => copyLink(link.token)}
                      disabled={link.used}
                      className="btn-simple text-sm disabled:opacity-50"
                    >
                      {t('admin.copy_link')}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Articles Management */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <h2 className="text-2xl font-normal mb-6">{t('admin.articles_management')}</h2>

          {articles.length === 0 ? (
            <div className="bg-gray-50 p-12 text-center">
              <p className="text-gray-500">{t('admin.no_articles')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map(article => (
                <div
                  key={article.id}
                  className="bg-white p-6 border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-normal mb-2">{article.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {article.author} • {new Date(article.createdAt).toLocaleDateString('ko-KR')}
                      </p>
                      <p className="text-gray-700 line-clamp-2">
                        {article.content.substring(0, 200)}
                        {article.content.length > 200 && '...'}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="ml-4 text-sm text-red-600 hover:text-red-800"
                    >
                      {t('admin.delete')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-6xl">
          <h2 className="text-2xl font-normal mb-6">{t('admin.newsletter')}</h2>
          <div className="bg-white p-8 border border-gray-200">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">{t('admin.weekly_newsletter')}</h3>
              <p className="text-gray-600 mb-4">
                {t('admin.articles_count')}: <strong>{weeklyArticles.length}개</strong>
              </p>

              {weeklyArticles.length > 0 && (
                <div className="bg-gray-50 p-4 mb-4">
                  <p className="text-sm font-medium mb-2">{t('admin.articles_included')}</p>
                  <ul className="space-y-1">
                    {weeklyArticles.map(article => (
                      <li key={article.id} className="text-sm text-gray-700">
                        • {article.title} ({article.author})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={handleSendNewsletter}
              disabled={sendingNewsletter || weeklyArticles.length === 0}
              className="btn-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingNewsletter ? t('admin.sending') : t('admin.send_newsletter')}
            </button>

            <p className="text-sm text-gray-500 mt-4">
              {t('admin.dev_note')}<br />
              {t('admin.prod_note')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
