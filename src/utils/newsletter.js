// Newsletter utility functions

/**
 * Get articles from the past week
 */
export const getWeeklyArticles = () => {
  const articles = JSON.parse(localStorage.getItem('articles') || '[]');
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return articles.filter(article => {
    const articleDate = new Date(article.createdAt);
    return articleDate >= oneWeekAgo;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

/**
 * Generate newsletter HTML content
 */
export const generateNewsletterHTML = (articles) => {
  if (articles.length === 0) {
    return `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 32px; font-weight: 400; margin-bottom: 24px; color: #111;">
          소프트 디벨로퍼 클럽 주간 뉴스레터
        </h1>
        <p style="font-size: 16px; line-height: 1.6; color: #666; margin-bottom: 32px;">
          이번 주에는 새로운 글이 없습니다.
        </p>
      </div>
    `;
  }

  const articlesHTML = articles.map(article => `
    <div style="margin-bottom: 40px; padding-bottom: 40px; border-bottom: 1px solid #e5e7eb;">
      <h2 style="font-size: 24px; font-weight: 400; margin-bottom: 12px; color: #111;">
        ${article.title}
      </h2>
      <p style="font-size: 14px; color: #666; margin-bottom: 16px;">
        ${article.author} • ${new Date(article.createdAt).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
      <div style="font-size: 16px; line-height: 1.8; color: #374151; white-space: pre-wrap;">
        ${article.content.substring(0, 300)}${article.content.length > 300 ? '...' : ''}
      </div>
      <a href="${window.location.origin}/blog"
         style="display: inline-block; margin-top: 16px; color: #111; text-decoration: none; border-bottom: 1px solid #111;">
        더 읽기 →
      </a>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>소프트 디벨로퍼 클럽 주간 뉴스레터</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb;">
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 48px;">
          <h1 style="font-size: 24px; font-weight: 400; margin-bottom: 8px; color: #111;">
            소프트 디벨로퍼 클럽
          </h1>
          <p style="font-size: 14px; color: #666;">
            주간 뉴스레터
          </p>
        </div>

        <!-- Intro -->
        <div style="margin-bottom: 48px;">
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            안녕하세요,<br><br>
            이번 주 전문가들의 인사이트를 전해드립니다.
          </p>
        </div>

        <!-- Articles -->
        ${articlesHTML}

        <!-- Footer -->
        <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid #e5e7eb; text-align: center;">
          <p style="font-size: 14px; color: #666; margin-bottom: 16px;">
            우리는 도시를 설계하지 않는다.<br>
            우리는 도시를 운영하고, 실험하고, 함께 배운다.
          </p>
          <p style="font-size: 12px; color: #9ca3af;">
            © 2025 Soft Developer Club. All rights reserved.
          </p>
          <p style="font-size: 12px; color: #9ca3af; margin-top: 16px;">
            더 이상 뉴스레터를 받고 싶지 않으시다면
            <a href="${window.location.origin}/unsubscribe" style="color: #111; text-decoration: underline;">
              구독 취소
            </a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Get list of newsletter subscribers
 */
export const getNewsletterSubscribers = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.filter(user => user.subscribeNewsletter);
};

/**
 * Send newsletter (실제로는 백엔드 API 호출)
 */
export const sendNewsletter = async () => {
  const weeklyArticles = getWeeklyArticles();
  const subscribers = getNewsletterSubscribers();
  const newsletterHTML = generateNewsletterHTML(weeklyArticles);

  // 실제 환경에서는 이메일 발송 API를 호출
  console.log('Sending newsletter to', subscribers.length, 'subscribers');
  console.log('Articles:', weeklyArticles.length);
  console.log('Newsletter HTML:', newsletterHTML);

  // 실제 구현 예시:
  // await fetch('/api/newsletter/send', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     subscribers: subscribers.map(s => s.email),
  //     html: newsletterHTML,
  //     subject: `소프트 디벨로퍼 클럽 주간 뉴스레터 - ${new Date().toLocaleDateString('ko-KR')}`
  //   })
  // });

  return {
    success: true,
    subscribersCount: subscribers.length,
    articlesCount: weeklyArticles.length,
    html: newsletterHTML
  };
};
