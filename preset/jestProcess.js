const fs            = require('fs')
const path          = require('path')
const configContent = fs.readFileSync(path.resolve(__dirname,'./babel.default.json'),'utf-8')

module.exports = require('babel-jest').createTransformer(JSON.parse(configContent))