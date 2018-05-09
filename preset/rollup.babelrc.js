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
        "modules"    : false,
        "loose"      : true,
        "useBuiltIns": "usage"
      }
    ]
  ],
  "plugins":[
    "@babel/plugin-proposal-async-generator-functions",
    "@babel/plugin-proposal-do-expressions",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-object-rest-spread"
  ]
}