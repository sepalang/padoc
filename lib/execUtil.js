const runner = require('@sepalang/runner')
const path   = require('path')
const { 
  pluginPadocSupportPresetLocs,
  pluginPadocSupportPluginLocs
} = require('./cliUtil')

module.exports.esExecute = function(execOption){
  const { input, module } = execOption
  let { interactive, global } = execOption
  
  return new Promise((resolve,reject)=>{
    //ready config
    let babel
    let babelCommands = []
    
    //presets
    babelCommands.push('--presets')
    babelCommands.push(pluginPadocSupportPresetLocs().join(','))
    
    //plugins
    babelCommands.push('--plugins')
    babelCommands.push(pluginPadocSupportPluginLocs().join(','))
    
    //input
    if(interactive === false){
      babelCommands.push('--')
      babelCommands.push(input)
      babel = require('child_process').spawn('babel-node', babelCommands, { stdio:[ process.stdin, process.stdout, process.stderr ] })
    } else {
      babel = require('child_process').spawn('babel-node', babelCommands, { stdio:[ 'pipe', null, process.stderr ] })
      
      process.stdin.on('data',(data)=>{ 
        babel.stdin.write(data) 
      })
    
      babel.stdout.on('data',(data)=>{
      
        process.stdout.write(data)
      
        if(interactive == true && data.toString().indexOf(">") > -1){
          //one time event
          interactive = false
        
          //variables
          const realInputPath = input.indexOf("/") === 0 ? input : path.resolve(process.cwd(),input)
          const importCommand = `require('${realInputPath}')`
          const realRunScript = `const self=require('${realInputPath}'); const $$=()=>\`The following attributes are set to global. [\$\{ Object.keys(self).map(key=>{global[key]=self[key]; return key; }) \}]\`; console.log("global.self << ",self); global.self = self;  'Loading of the module is done. To use exports, check the "self" variable. or $$()';\n`
        
          //fake display
          process.stdout.write(`import '${realInputPath}'`)
        
          //run script
          console.log("") // insert newline
          console.log("INFO : Loading module to perform REPL. Please wait a moment..")
          
          const stdinScript = Buffer.from(realRunScript, 'utf8')
          babel.stdin.write(stdinScript)
          
          if(global){
            babel.stdin.write(Buffer.from('$$()\n', 'utf8'));
          }
        }
        
      })
    }
    
    //babel.stderr.on('data',(data)=>process.stderr.write(data))
    babel.on('close', (code)=>{
      if(code === 0){
        resolve()
      } else {
        reject(1)
      }
    })
  })
}

module.exports.esTest = function(testOption){
  const { input, verbose, pattern } = testOption
  
  return runner(async ({ run, find })=>{
  
    const testCommands = []
    
    //input
    testCommands.push(input)
    
    //config
    testCommands.push('--config')
    testCommands.push(find('../preset/jest.config.js',__dirname))
    
    //--testNamePattern
    if(pattern){
      testCommands.push('--testNamePattern')
      testCommands.push(pattern)
    }
    
    //verbose
    if(verbose){
      testCommands.push('--verbose')
    }
    
    //execute
    const executeCommands = ['jest'].concat(testCommands)
    await run(executeCommands)
    
  })
}