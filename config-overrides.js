const SriPlugin = require('webpack-subresource-integrity');

module.exports = function override(config, env) {
    if (!config.plugins) {
        config.plugins = [];
    }

    if (process.env.NODE_ENV === 'production') {
        config.output.crossOriginLoading = 'anonymous';
        config.plugins.push(
            new SriPlugin({
                hashFuncNames: ['sha384'],
            })
        );
    }
    return config;
}