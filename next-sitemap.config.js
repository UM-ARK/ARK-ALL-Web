/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://umall.one',
  generateRobotsTxt: true,
  exclude: [
    '/club/*',
    '/clubsignin',
    '/api/*',
    '/server-sitemap.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/club/', '/clubsignin', '/api/'],
      },
    ],
  },
};
