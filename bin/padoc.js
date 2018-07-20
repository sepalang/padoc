#!/usr/bin/env node
const fs   = require('fs')
const glob = require('glob')
const { esCompile, packCompile } = require('../lib/compileUtil')
const { esExecute, esTest } = require('../lib/execUtil')
const myself = require('@sepalang/myself')

const argvProps = myself.args
const argv = {
  signal    : null,
  module    : 'umd',
  name      : 'module',
  input     : null,
  output    : null,
  sourcemaps: false
}

// setting : input output signal
if(argvProps['pack']){
  //packs mode
  argv.input  = (argvProps['pack']).trim().split(/\s+/)
  argv.output = argvProps['_'][0]
  argv.signal = "pack"
} else if(argvProps['exec']){
  //exec
  argv.input  = argvProps['exec']
  argv.signal = "exec"
} else if(argvProps['test']) {
  argv.input  = argvProps['test']
  argv.signal = "test"
} else {
  //compile mode
  argv.input  = argvProps['_'][0]
  argv.output = argvProps['_'][1]
  argv.signal = "compile"
}

if(!argv.input)  throw new Error("Input must be defined.")
if(!argv.output){
  if(!/exec|test/.test(argv.signal)){
    throw new Error("Output must be defined.")
  }
} 

// setting : (output) module
argv.module = argvProps['m'] || argvProps['module'] || argv.module
argv.name = argvProps['n'] || argvProps['name'] || argv.name
argv.sourcemaps = argvProps['s'] || argvProps['sourcemaps'] || argv.sourcemaps

// detect glob pattern
if(argv.input instanceof Array){
  const globedInput = []
  
  argv.input.forEach(path=>{
    if(path.indexOf("*") === -1){
      return globedInput.push(path)
    }
    console.log('glogsync',path)
    glob.sync(path).forEach(globPath=>{
      console.log('globPath',globPath)
      //ignore spec.js, test.js
      !/(\.spec\.js|\.test\.js)/.test(globPath) && globedInput.push(globPath)
    })
  })
  console.log("globedInput",globedInput)
  
  argv.input = globedInput
}

// Is input directory or folder?
let argvInput   = argv.input instanceof Array ? argv.input[0] : argv.input
let typeofInput = null

try {
  let result = {
    is: undefined
  }
  
  let globs = glob.sync(argvInput)
  
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
  console.error(`Input is invalid (not found) :: ${argvInput}`)
  process.exit(1)
} else {
  argv['typeofInput'] = typeofInput
}

switch (argv.signal){
case 'compile':
  esCompile(argv)
  .then(e=>{
    process.exit(0)
  })
  .catch(e=>{
    console.log(`Opps compile fail!`,e)
    process.exit(1)
  })
  break
case 'pack':
  packCompile(argv)
  .then(e=>{
    process.exit(0)
  })
  .catch(e=>{
    console.log(`Padoc --pack compile fail!`,e)
    process.exit(1)
  })
  break
case 'exec':
  argv.interactive = argvProps['i'] || argvProps['interactive'] || false
  argv.global = argvProps['g'] || argvProps['global'] || false
  
  esExecute(argv)
  .catch(e=>{
    console.log(`Padoc --exec fail!`,e)
    process.exit(1)
  })
  break
case 'test':
  argv.verbose = !!argvProps.verbose;
  
  esTest(argv)
  .catch(e=>{
    console.log(`Padoc --test fail!`,e)
    process.exit(1)
  })
}