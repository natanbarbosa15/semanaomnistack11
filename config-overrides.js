const { addBabelPlugin, override } = require("customize-cra");
const SriPlugin = require("webpack-subresource-integrity");

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
