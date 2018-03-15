const fs = require('fs')
const pathUtil = require('path')
const precinct = require('precinct');
const rootResolve = require('./packageUtil').rootResolve;
const entry = rootResolve("sample/src/");

function hasValue(data,valueOrPattern){
    if(typeof valueOrPattern === "function"){
        for(var d=data,i=0,l=d.length;i<l;i++){
            if(valueOrPattern(d[i],i) === true) return true;
        }
    } else {
        for(var d=data,i=0,l=d.length;i<l;i++){
            if(d[i] === valueOrPattern) return true;
        }
    }
    return false;
}

function getFilePath(path){
    let incomePath = rootResolve(path);
    let stat = fs.statSync(incomePath)
    if(stat.isDirectory()){
        incomePath = pathUtil.resolve(incomePath,"index.js")
        stat = fs.statSync(incomePath)
    }
    return stat.isFile() ? incomePath : null;
}

function readFileWithPath(path){
    const filePath = getFilePath(path);
    if(!filePath) return null;
    return {
        path:filePath,
        content:fs.readFileSync(cpath, 'utf8')
    }
}

function findAllDependancy(entry){
    let curious = [entry];
    let finded = [];
    
    do {
        let newCuriosity = [];

        curious.forEach(cpath=>{
            let content = readContentWithPath(cpath);

            var findedDeps = precinct(content, { 
                amd: { skipLazyLoaded: true }, 
                es6:{ mixedImports: true }
            });

            console.log('findedDeps');
        })

        curious = newCuriosity;
    } while(!!curious.length)
}

console.log('findAllDependancy',findAllDependancy(entry));

module.exports = {
    default:findAllDependancy
}