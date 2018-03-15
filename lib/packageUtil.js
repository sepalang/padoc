const path = require('path')
const packageRoot = require('package.root')
const rootName = packageRoot.name
const rootPath = packageRoot.path
const rootResolve = relativePath=>path.resolve(rootPath,relativePath)
const package = {
    name:rootName,
    path:rootPath,
    resolve:rootResolve
}

module.exports = {
    rootName,
    rootPath,
    rootResolve,
    default:package
}