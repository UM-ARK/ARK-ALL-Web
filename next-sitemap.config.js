/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://umall.one',
  generateRobotsTxt: true,
  exclude: [
    '/club/*',
    '/api/*',
    '/app/*',
    '/server-sitemap.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/club/', '/api/', '/app/'],
      },
    ],
  },
};
