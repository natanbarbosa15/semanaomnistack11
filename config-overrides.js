const { addBabelPlugin, override } = require("customize-cra");
const SriPlugin = require("webpack-subresource-integrity");
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
  "default-src": "'none'",
  "base-uri": "'self'",
  "object-src": "'none'",
  "script-src": ["'self'", "https://*.googleapis.com"],
  "style-src": ["'self'", "'unsafe-inline'", "https://*.googleapis.com"],
  "img-src": ["'self'", "data:"],
  "connect-src": [
    "https://gateway-hio7rdwdxq-uc.a.run.app",
    "https://*.googleapis.com",
  ],
  "font-src": ["'self'", "https://*.gstatic.com"],
  "frame-src": ["'self'", "https://*.google.com", "https://*.iubenda.com"],
  "form-action": [
    "'self'",
    "https://gateway-hio7rdwdxq-uc.a.run.app",
    "https://*.googleapis.com",
  ],
  "manifest-src": "'self'",
};

const cspConfigOptions = {
  enabled: true,
  hashingMethod: "sha384",
  hashEnabled: {
    "script-src": true,
    "style-src": true,
  },
  nonceEnabled: {
    "script-src": false,
    "style-src": false,
  },
};

function configWebpack(config, env) {
  if (!config.plugins) {
    config.plugins = [];
  }

  if (process.env.NODE_ENV === "production") {
    config.output.crossOriginLoading = "anonymous";
    config.plugins.push(
      new SriPlugin({
        hashFuncNames: ["sha384"],
      })
    );
    config.plugins.push(
      new cspHtmlWebpackPlugin(cspConfigPolicy, cspConfigOptions)
    );
  }
  return config;
}

module.exports = override(
  configWebpack,
  addBabelPlugin([
    "babel-plugin-root-import",
    {
      rootPathSuffix: "./src",
      rootPathPrefix: "~/",
    },
  ])
);
