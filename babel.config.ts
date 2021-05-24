
const prodPlugins: any = process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : []
module.exports = {
    plugins: [
        ...prodPlugins,
        [
            "component",
            {
                "libraryName": "element-plus",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}