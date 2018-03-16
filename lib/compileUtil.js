const fileUtil = require("./fileUtil")
const mkdir = fileUtil.mkdir
const rmrf = fileUtil.rmrf


module.exports.esCompile = function({ typeofInput, input, output, module }){
  return new Promise((resolve,reject)=>{
    //ready config
    
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
      babelCommands.push(`@babel/plugin-transform-modules-${module}`)
      break
    case "cjs":
      babelCommands.push(`@babel/plugin-transform-modules-commonjs`)
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

const { rollup } = require('rollup')
const rollupPluginBabel = require('rollup-plugin-babel')

module.exports.packCompile = function({ typeofInput, input, output, module }){
  if(typeofInput.is !== "file"){
    console.log("pack complie only support file");
  }
  
  return rollup({
    input: input,
    plugins: [
      rollupPluginBabel({
        plugins: ['external-helpers'],
        externalHelpers: true,
        runtimeHelpers: true,
      })
    ]
  })
  .then(function(e){
    console.log("rollup complete",e)
  })
  .catch(function(e){
    console.log("faile?",e);
  });
}