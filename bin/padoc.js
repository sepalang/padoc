#!/usr/bin/env node
const fs   = require('fs')
const glob = require('glob')
const { esCompile, packCompile } = require('../lib/compileUtil')


const argvProps = require('minimist')(process.argv.slice(2))
const argv = {
  signal: null,
  module: 'commonjs',
  name: 'module',
  input : null,
  output: null,
}

// setting : input output signal
if(argvProps['pack']){
  //pack mode
  argv.input  = argvProps['pack']
  argv.output = argvProps['_'][0]
  argv.signal = "pack"
} else {
  //compile mode
  argv.input  = argvProps['_'][0]
  argv.output = argvProps['_'][1]
  argv.signal = "compile"
}


if(!argv.input)  throw new Error("Input must be defined.")
if(!argv.output) throw new Error("Output must be defined.")
if(!argv.signal) throw new Error("This command does not know what to do...")
  

// setting : (output) module
argv.module = argvProps['m'] || argvProps['module'] || argv.module
argv.name = argvProps['n'] || argvProps['name'] || argv.name
  
// Is input directory or folder?
let typeofInput = null

try {
  //
  let result = {
    is: undefined
  }
  
  let globs = glob.sync(argv.input)
  
  if(globs.length){
    let inputStat = fs.statSync(globs[0])
    if(inputStat.isDirectory()){
      result.is = "directory"
    } 
    if(inputStat.isFile()){
      result.is = "file"
    }
    if(result.is){
      typeofInput = result
    }
  }
  
} catch (e) {
  console.error(`Error occurred while parsing the input. \n${e}`)
  process.exit(1)
}

if(!typeofInput) {
  console.error(`Input is invalid (not found) :: ${argv.input}`)
  process.exit(1)
} else {
  argv['typeofInput'] = typeofInput
}

switch (argv.signal){
case 'compile':
  console.log(`Padoc compile start!`)
  esCompile(argv)
  .then(e=>{
    console.log(`Padoc compile success!`)
    process.exit(0)
  })
  .catch(e=>{
    console.log(`Opps compile fail!`,e)
    process.exit(1)
  })
  break
case 'pack':
  console.log(`Padoc --pack compile start!`)
  packCompile(argv)
  .then(e=>{
    console.log(`Padoc --pack compile success!`)
    process.exit(0)
  })
  .catch(e=>{
    console.log(`Padoc --pack compile fail!`,e)
    process.exit(1)
  })
  break
}