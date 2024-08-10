module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  output: "standalone",

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/user_agreement.html',
        destination: '/user_agreement',
        permanent: true,
      },
      {
        source: '/qa.html',
        destination: '/qa',
        permanent: true,
      },
    ]
  },
};
