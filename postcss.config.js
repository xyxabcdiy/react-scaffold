const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');

module.exports = ({file, options, env}) => {
    return {
        parser: false,
        sourceMap: true,
        plugins: (loader) => [
            postcssImport({root: loader.resourcePath}),
            autoprefixer({
                browsers: ['last 2 versions']
            })
        ]
    };
};
