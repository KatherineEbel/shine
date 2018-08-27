const { environment } = require('@rails/webpacker');
const typescript =  require('./loaders/typescript');

environment.loaders.append('typescript', typescript);
environment.loaders.append('html', {
    test: /\.html$/,
    use: [{
        loader: 'html-loader',
        options: {
            exportAsEs6Default: 'es6',
            minimize: true,
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: false,
            keepClosingSlash: true,
            caseSensitive: true,
            conservativeCollapse: true,
        }
    }]
});
module.exports = environment;
