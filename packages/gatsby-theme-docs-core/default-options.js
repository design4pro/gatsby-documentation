module.exports = themeOptions => {
    const basePath = themeOptions.basePath || `/`;
    const contentPath = themeOptions.contentPath || `content`;
    const assetPath = themeOptions.assetPath || `static/assets`;
    const defaultVersion = themeOptions.defaultVersion || 'default';
    const versions = themeOptions.versions || {};

    return {
        basePath,
        contentPath,
        assetPath,
        defaultVersion,
        versions
    };
};
