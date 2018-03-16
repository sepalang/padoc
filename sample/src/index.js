import animals from './animals'

//compile spec
const human = {name:"jake", age:12}

const case1 = function({name, age}){
  return `name: ${name} age ${age}`
}

case1(human)

const case2 = function(...args){
  return args.length
}

case2(1,2,3,4)

const case3 = function(cloneHuman){
  return {
    ...cloneHuman
  }
}

case3(human)

const all = {
  animals
}



export default all