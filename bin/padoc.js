#!/usr/bin/env node
const path = require("path")
const argv = {
  signal:"compile",
  from:"es6",
  args:[]
}

let castCommand = null;
process.argv.forEach((value, index) => {
  if(index == 1){
    argv.root = path.resolve(value,"../../../") 
  }
  
  if(index == 2){
    argv.src = path.resolve(argv.root,value)
  }
  
  if(index > 2){
    if(!castCommand && value.indexOf("-") === 0){
      switch(value){
        case "-s": case "--signal":
          castCommand = "signal"
          break
        case "-o": case "--out":
          castCommand = "out"
          break
        case "-m": case "--module":
          castCommand = "module"
          break
        default
          console.warn(`unknown command ${value}`)
          break
      }
    } else {
      if(castCommand){
        argv[castCommand] = value
        castCommand       = null
      } else {
        argv.args.push(castCommand)
      }
    }
  }
});

console.log("padoc command!\n",argv)