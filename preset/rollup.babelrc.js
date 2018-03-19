module.exports.default = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [
            "last 2 versions",
            "safari >= 7"
          ]
        },
        "modules": false,
        "loose": true,
        "useBuiltIns": "usage"
      }
    ]
  ],
  "plugins":[
    "@babel/plugin-proposal-object-rest-spread"
  ]
}