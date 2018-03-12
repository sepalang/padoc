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
babelCommands.push(argv.output)

//plugins
babelCommands.push('--plugins')
babelCommands.push(`transform-es2015-modules-${argv.module}`)


const spawn = require('child_process').spawn
const babel = spawn('babel', [
  argv.input, 
  '--out-dir',argv.output,
  '--plugins','transform-es2015-modules-commonjs'
])

babel.stdout.on('data',(data)=>console.log(data))
babel.stderr.on('data',(data)=>console.log(data))
babel.on('close', (code)=>{
  console.log(`padoc close :: ${code}`)
})

console.log("padoc command!\n",argv)