const path = require('path')
const myself = require('myself')
const rootName = myself.name
const rootPath = myself.path
const rootResolve = relativePath=>path.resolve(rootPath,relativePath)

const fs = require('fs')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

const package = module.exports.package = {
  name:rootName,
  path:rootPath,
  resolve:rootResolve
}

const isExsistDirectory = module.exports.isExsistDirectory = function(path){
  try {
    return fs.statSync(package.resolve(path)).isDirectory()
  } catch (e){
    return false
  }
}

const mkdir = module.exports.mkdir = function(path){
  if(!isExsistDirectory(path)){
    const resultPath = package.resolve(path);
    mkdirp.sync(resultPath)
    return resultPath;
  }
  return null
}

const rmrf = module.exports.rmrf = function(path){
  if(isExsistDirectory(path)){
    const resultPath = package.resolve(path);
    rimraf.sync(resultPath)
    return resultPath;
  }
  return null;
}