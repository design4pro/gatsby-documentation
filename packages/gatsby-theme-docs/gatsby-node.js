const path = require('path');

/**
 * Webpack feature for aliasing in your import statements, just import this plugin
 * and all of your folders inside your src will be available with aliases.
 *
 * ```js
 * import "styles/layout.css"
 * import Header from "components/Header"
 * ```
 * 
 * Instead of
 *
 * ```js
 * import "../../styles/layout.css"
 * import Header from "../components/Header/index.js"
 */
exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules']
        }
    });
};
