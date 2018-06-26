const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');

module.exports = () => {
    return {
        ident: 'postcss',
        sourceMap: true,
        plugins: (loader) => [
            postcssImport({root: loader.resourcePath}),
            autoprefixer({
                browsers: ['last 2 versions']
            })
        ]
    };
};
