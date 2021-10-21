module.exports = {
    presets: [["@nuxt/babel-preset-app",{"useBuiltIns": "entry", "corejs": 3}]],
    plugins: [
        [
            "@babel/plugin-transform-runtime",
            {
                "corejs": 3
            }
        ]
    ]
};
