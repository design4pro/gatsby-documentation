const path = require('path');

/**
 * So you can do
 *
 * ```js
 * import 'components/navbar'
 * ```
 * Instead of
 *
 * ```js
 * import '../../components/navbar.js'
 * ```
 */
exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules']
        }
    });
};
