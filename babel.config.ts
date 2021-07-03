
const prodPlugins: any = process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : []
module.exports = {
    plugins: [
        ...prodPlugins,
        [
            "import",
            {
                "libraryName": "vant",
                "libraryDirectory": "es",
                "style": true
            }
        ]
    ]
}