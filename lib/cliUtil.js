const { rootResolve } = require('./packageUtil')

module.exports.pluginPadocSupportPresetLocs = ()=>([
  rootResolve("node_modules/@babel/preset-env")
])

module.exports.pluginPadocSupportPluginLocs = ()=>([
  rootResolve("node_modules/@babel/plugin-proposal-async-generator-functions"),
  rootResolve("node_modules/@babel/plugin-proposal-do-expressions"),
  rootResolve("node_modules/@babel/plugin-proposal-numeric-separator"),
  rootResolve("node_modules/@babel/plugin-proposal-object-rest-spread")
])