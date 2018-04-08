[![CircleCI](https://circleci.com/gh/sepalang/padoc/tree/master.svg?style=shield)](https://circleci.com/gh/sepalang/padoc/tree/master)

# PADOC
It is a tool for extracting compilation and distribution source with a simple command library written in es6.


## TODO
  - [x] padoc src dist -m [commonjs,amd,umd\]\(0.1.0)
  - [x] padoc --pack src/pack.js dist/pack.js -m [commonjs,amd,umd,iife] -n iifename (0.3.0)
  - [x] padoc --exec src/pack.js  (0.5.0)
  - [ ] ES6 sorucemap(0.6.x)
  - [ ] Pack sourcemap(0.6.x)
  - [ ] Delete root babelrc (0.7.x)
  - [ ] padoc --test [test folder]\(0.8.x)
  - [ ] padoc --lint [glob path]\(0.9.x)
  
## Install
```
npm i sepalang/padoc
```



## Usage

### ES6 each module compile
```
padoc src dist -m umd
```
> It will be start recursive compile

### One file compile
```
padoc --pack src/index.js dist/onefile.js -m umd
```
> It will be other files with dependencies will be stored in a single file. (By import or require)

## Default plugins
### Object rest spread
[link](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-object-rest-spread)
```ts
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
let n = { x, y, ...z };
```

### Do expression
[link](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-do-expressions)
```ts
let a = do {
  if(x > 10) {
    'big';
  } else {
    'small';
  }
};
```

### Numeric separator
[link](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-numeric-separator)
```ts
let budget = 1_000_000_000_000;
```

### Async generators
[link](https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-async-generators#babelplugin-syntax-async-generators)
```
async function* agf() {
  await 1;
}
```

