const path = require('path')
const myself = require('myself')
const rootName = myself.name
const rootPath = myself.path
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