#!/usr/bin/env node
const fs   = require('fs')
const glob = require('glob')
const argvProps = require('minimist')(process.argv.slice(2))
const argv = {
  signal: "compile",
  module: "commonjs",
  input : null,
  output: null,
}

argv.input  = argvProps['_'][0]
argv.output = argvProps['_'][1]

let signalProp = argvProps['s'] || argvProps['signal']
if(signalProp){
  argv.signal = signalProp
}

let moduleProp = argvProps['m'] || argvProps['module']
if(moduleProp){
  argv.module = moduleProp
}

if(!argv.input)  throw new Error("Input must be defined.")
if(!argv.output) throw new Error("Output must be defined.")

let outputMode = "single"
let babelCommands = []
let globs

//input
try {
  globs = glob.sync(argv.input)
  
  if(globs.length === 0){
    throw new Error("Invalid path")
  }
  
  if(globs.length === 1){
    let inputStat = fs.statSync(globs[0])
    if(inputStat.isDirectory()){
      outputMode = "multiple"
    } else if(inputStat.isFile()){
      //ok
    } else {
      throw new Error("Not supported path")
    }
  }
  
} catch (e) {
  console.error(`Input path is invalid :: ${argv.input} \n${e}`)
  process.exit(1)
}

//input
babelCommands.push(argv.input)

//ouput
switch (outputMode){
case "single":
  babelCommands.push('--out-file')
  babelCommands.push(argv.output)
  break
case "multiple":
  //ouput
  babelCommands.push('--out-dir')
  babelCommands.push(argv.output)
  break
default:
  console.error(`Unknown output ${outputMode}`)
  process.exit(1)
}

//plugins
babelCommands.push('--plugins')
switch (argv.module){
case "amd": case "umd": case "commonjs":
  babelCommands.push(`transform-es2015-modules-${argv.module}`)
  break
case "cjs":
  babelCommands.push(`transform-es2015-modules-commonjs`)
  break
default:
  console.error(`Unknown out module ${outputMode}`)
  process.exit(1)
}



console.log(`Padoc compile start!`)

const spawn = require('child_process').spawn
const babel = spawn('babel', babelCommands)
babel.stdout.on('data',(data)=>console.log(data.toString()))
babel.stderr.on('data',(data)=>console.log(data.toString()))
babel.on('close', (code)=>{
  if(code === 0){
    console.log(`Padoc compile success !`)
  }
})