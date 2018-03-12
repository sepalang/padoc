#!/usr/bin/env node
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

const babelCommands = []

//input
babelCommands.push(argv.input)

//ouput
babelCommands.push('--out-dir')
babelCommands.push(argv.output)

//plugins
babelCommands.push('--plugins')
babelCommands.push(`transform-es2015-modules-${argv.module}`)


console.log("padoc compile start",babelCommands.join(" "));

const spawn = require('child_process').spawn
const babel = spawn('babel', babelCommands)
babel.stdout.on('data',(data)=>console.log(data.toString()))
babel.stderr.on('data',(data)=>console.log(data.toString()))
babel.on('close', (code)=>{
  console.log(`padoc close :: ${code}`)
})