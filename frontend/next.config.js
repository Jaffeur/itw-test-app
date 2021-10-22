const envalid = require('envalid');

const env = envalid.cleanEnv(process.env, {
  API_URL: envalid.url({ default: 'http://localhost:3000' }),
});

// Filter env variables for Next.js config.
// https://github.com/zeit/next.js/blob/master/errors/env-key-not-allowed.md
function filterEnvForNextjs(allEnv) {
  const cleanEnv = {};

  for (const envName in allEnv) {
    if (!/^(__|NODE_)/.test(envName)) {
      cleanEnv[envName] = allEnv[envName];
    }
  }

  return cleanEnv;
}

module.exports = {
  // Even that Next.js team recommends serverless target we cannot
  // use it because it's not compatible with custom server.
  target: 'server',

  // Populate process.env with our environment variables.
  env: filterEnvForNextjs(env),

  // We don't benefit from exposing that our app is running Next.js
  // so why not to hide this information :)
  poweredByHeader: false,

  // React's Strict Mode is a development mode only feature for highlighting
  // potential problems in an application. It helps to identify unsafe
  // lifecycles, legacy API usage, and a number of other features.
  reactStrictMode: true,

  // https://github.com/shadowwalker/next-pwa/issues/135#issuecomment-778573830
  future: {
    webpack5: true,
  },
};
