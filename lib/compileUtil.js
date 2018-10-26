const path = require('path')


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
    
    //ignore compile test, spec
    babelCommands.push("--ignore")
    babelCommands.push("**/*.spec.js,**/*.spec.jsx,**/*.test.js,**/*.test.jsx,**/.*")
    
    //
    const spawn = require('child_process').spawn
    const babel = spawn('babel', babelCommands)
    
    babel.stdout.on('data',(data)=>console.log(data.toString()))
    babel.stderr.on('data',(data)=>console.log(data.toString()))
    babel.on('close', (code)=>{
      if(code === 0){
        resolve()
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
    const babelrc = require('../preset/rollup.babelrc.js').default
    const plugins = [];
    
    //plugins
    module !== "es" && plugins.push(rollupPluginBabel(babelrc))
    plugins.push(nodeResolve({jsnext: true}))
    plugins.push(commonjs({include: 'node_modules/**'}))
    
    //
    if(typeofInput.is !== "file"){
      console.log("pack complie only support file")
    }
    
    // input
    const rollupInputParams = (()=>{
      if(input.length > 1){
        return {
          input,
          plugins,
          treeshake:true,
          experimentalCodeSplitting: true,
          experimentalPreserveModules: false,
          optimizeChunks:true
        }
      } else {
        return {
          input:input[0],
          plugins
        }
      }
    })();
    
    const rollupOutputParams = (()=>{
      if(input.length > 1){
        return {
          dir      : output,
          format   : module,
          name     : name,
          sourcemap: !!sourcemaps,
          chunkFileNames:'chunks/[name].[hash].js'
        }
      } else {
        return {
          file     : output,
          format   : module,
          name     : name,
          sourcemap: !!sourcemaps
        }
      }
    })()
    
    return rollup(rollupInputParams)
    .then(function(e){
      console.log(`--pack(${input.length}) => [${input}] \n${JSON.stringify(rollupOutputParams,2,2)}`)
      return e.write(rollupOutputParams)
    })
  }
  
  return packCompile
}())

