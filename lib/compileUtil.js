const fileUtil = require("./fileUtil")
const path = require('path')
const mkdir = fileUtil.mkdir
const rmrf = fileUtil.rmrf


module.exports.esCompile = function({ typeofInput, input, output, module, sourcemaps }){
  return new Promise((resolve,reject)=>{
    //ready config
    
    let babelCommands = []

    //babelrc
    babelCommands.push('--config-file')
    babelCommands.push(path.resolve(__dirname,"../preset/babel.default.json"))

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
    
    //sourcemaps
    if(sourcemaps){
      babelCommands.push('--source-maps')
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


module.exports.packCompile = (function(){
  const { rollup } = require('rollup')
  const rollupPluginBabel = require('rollup-plugin-babel')
  const commonjs = require('rollup-plugin-commonjs')
  const nodeResolve = require('rollup-plugin-node-resolve')
  
  const packCompile = function({ typeofInput, input, output, module, name, sourcemaps }){
    const babelrc = require('../preset/rollup.babelrc.js').default;
    const plugins = [
      rollupPluginBabel(babelrc),
      nodeResolve(),
      commonjs({
        include: 'node_modules/**'
      })
    ];
    
    if(typeofInput.is !== "file"){
      console.log("pack complie only support file");
    }

    return rollup({
      input,
      plugins
    })
    .then(function(e){
      const writeOption = {
        file: output,
        format: module,
        name: name,
        sourcemap: !!sourcemaps
      };
      
      console.log(`--pack write \n${JSON.stringify(writeOption,2,2)}`, );
      
      return e.write(writeOption);
    })
  }
  return packCompile;
}())

