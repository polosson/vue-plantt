module.exports = {
    outputDir: 'dist',
    pages: {
        demo: {
            entry: 'public/demo.ts',
            template: 'public/demo.html',
            filename: 'index.html',
        },
    },
    configureWebpack: {
        output: {
            libraryExport: 'default',
        },
    },
};
