const fs = require('fs')
const path = require('path')

const getPathOfPadocBabelConfig = function(){
  return path.join(__dirname,"preset",'babel.default.json');
}

const getContentOfPadocBabelConfig = function(){
  return fs.readFileSync(getPathOfPadocBabelConfig(),'utf-8');
}

module.exports = {
  getPathOfPadocBabelConfig,
  getContentOfPadocBabelConfig
};