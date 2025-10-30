import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-sm font-medium mb-4 text-gray-900">{t('site.name')}</h3>
            <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4 text-gray-900">{t('footer.links')}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/experts" className="hover:text-gray-900 transition-colors">{t('nav.members')}</a></li>
              <li><a href="/curriculum" className="hover:text-gray-900 transition-colors">{t('nav.programs')}</a></li>
              <li><a href="/membership" className="hover:text-gray-900 transition-colors">{t('nav.membership')}</a></li>
              <li><a href="/schedule" className="hover:text-gray-900 transition-colors">{t('nav.apply')}</a></li>
              <li><a href="/contact" className="hover:text-gray-900 transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4 text-gray-900">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>contact@softdeveloper.club</li>
              <li>02-1234-5678</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-xs text-gray-400">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
