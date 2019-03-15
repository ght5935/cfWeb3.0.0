
export default {
  'entry': 'src/entry/*.js',
  'outputPath': './dist',
  'publicPath': '/cfAdmin/cf/',
  // 'multiPage': true,
  'theme': "theme.config.js",
  // "proxy": {
  //     "/api": {
  //         "target": "http://jsonplaceholder.typicode.com/",
  //         "changeOrigin": true,
  //         "pathRewrite": { "^/api" : "" }
  //     }
  // },
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    },
    "production": {
      'extraBabelIncludes': [
        'node_modules/swiper/',
        'node_modules/dom7/'
      ],
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    }
  }
}

