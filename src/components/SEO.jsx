import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SEO = ({
  title,
  description,
  keywords,
  ogImage = '/og-image.jpg',
  url
}) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set HTML lang attribute
    document.documentElement.lang = i18n.language;

    // Set title
    document.title = title ? `${title} | Soft Developer Club` : 'Soft Developer Club';

    // Set meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: url || window.location.href },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage }
    ];

    metaTags.forEach(tag => {
      let element = document.querySelector(`meta[${tag.name ? 'name' : 'property'}="${tag.name || tag.property}"]`);
      if (element) {
        element.setAttribute('content', tag.content);
      } else {
        element = document.createElement('meta');
        if (tag.name) {
          element.setAttribute('name', tag.name);
        } else {
          element.setAttribute('property', tag.property);
        }
        element.setAttribute('content', tag.content);
        document.head.appendChild(element);
      }
    });

    // Alternate language links
    const alternates = [
      { lang: 'ko', hreflang: 'ko', href: `${window.location.origin}${window.location.pathname}?lang=ko` },
      { lang: 'en', hreflang: 'en', href: `${window.location.origin}${window.location.pathname}?lang=en` },
      { lang: 'ja', hreflang: 'ja', href: `${window.location.origin}${window.location.pathname}?lang=ja` },
      { lang: 'zh', hreflang: 'zh', href: `${window.location.origin}${window.location.pathname}?lang=zh` },
      { lang: 'fr', hreflang: 'fr', href: `${window.location.origin}${window.location.pathname}?lang=fr` },
      { lang: 'x-default', hreflang: 'x-default', href: window.location.origin + window.location.pathname }
    ];

    alternates.forEach(alt => {
      let link = document.querySelector(`link[hreflang="${alt.hreflang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', alt.hreflang);
        link.setAttribute('href', alt.href);
        document.head.appendChild(link);
      }
    });
  }, [title, description, keywords, ogImage, url, i18n.language]);

  return null;
};

export default SEO;
