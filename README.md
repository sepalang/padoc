[![CircleCI](https://circleci.com/gh/sepalang/padoc/tree/master.svg?style=shield)](https://circleci.com/gh/sepalang/padoc/tree/master)

# PADOC
It is a tool for extracting compilation and distribution source with a simple command library written in es6.


## TODO
  - [x] padoc src dist -m [commonjs,amd,umd\]\(0.1.0)
  - [x] padoc --pack src/pack.js dist/pack.js -m [commonjs,amd,umd,iife] -n iifename (0.3.0)
  - [ ] ES6 sorucemap(0.5.x)
  - [ ] Pack sourcemap(0.5.x)
  - [ ] Delete root babelrc (0.6.x)
  - [ ] padoc --test [test folder]\(0.7.x)
  - [ ] padoc --lint [glob path]\(0.8.x)
  
## Install
```
npm i sepalang/padoc
```

## Usage

### ES6 each module compile
- Supported object spread
```
padoc src dist -m umd
```
> It will be start recursive compile

### One file compile
```
padoc --pack src/index.js dist/onefile.js -m umd
```
> It will be other files with dependencies will be stored in a single file. (By import or require)