const path = require('path')
const { rootResolve } = require('../lib/packageUtil')

module.exports = {
  globals             : {},
  roots               : [rootResolve(".")/*,"<rootDir>"*/],
  moduleFileExtensions: ["js"],
  testMatch           : ["**/*.(test|spec).(js|jsx)"],
  transform           : {
    "^.+\\.jsx?$": path.resolve(__dirname,'jestProcess.js')
  }
}