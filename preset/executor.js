const path = require('path')
const packageRoot = require('package.root')

const rootName = packageRoot.name
const rootPath = packageRoot.path
const rootResolve = relativePath=>path.resolve(rootPath,relativePath)

const package = module.exports.package = {
  name:rootName,
  path:rootPath,
  resolve:rootResolve
}

module.exports.esCompile = function({ typeofInput, input, output, module }){
  return new Promise((resolve,reject)=>{
    let babelCommands = []

    //input
    babelCommands.push(input)

    //ouput
    switch (typeofInput.is){
    case "file":
      babelCommands.push('--out-file')
      babelCommands.push(output)
      break
    case "directory":
      //ouput
      babelCommands.push('--out-dir')
      babelCommands.push(output)
      break
    default:
      console.error(`Unknown input file ${typeofInput.is}`)
      return reject(1)
    }

    //plugins
    babelCommands.push('--plugins')
    switch (module){
    case "amd": case "umd": case "commonjs":
      babelCommands.push(`transform-es2015-modules-${module}`)
      break
    case "cjs":
      babelCommands.push(`transform-es2015-modules-commonjs`)
      break
    default:
      console.error(`Unknown out module ${module}`)
      return reject(1)
    }

    const spawn = require('child_process').spawn
    const babel = spawn('babel', babelCommands)
    babel.stdout.on('data',(data)=>console.log(data.toString()))
    babel.stderr.on('data',(data)=>console.log(data.toString()))
    babel.on('close', (code)=>{
      if(code === 0){
        resolve();
      } else {
        reject(1)
      }
    })
  })
}