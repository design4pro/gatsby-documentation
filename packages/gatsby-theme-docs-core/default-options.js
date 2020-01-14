module.exports = themeOptions => {
    const basePath = themeOptions.basePath || `/`;
    const contentPath = themeOptions.contentPath || `content`;
    const assetPath = themeOptions.assetPath || `static/assets`;

    return {
        basePath,
        contentPath,
        assetPath
    };
};
