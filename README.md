[![CircleCI](https://circleci.com/gh/sepalang/padoc/tree/master.svg?style=shield)](https://circleci.com/gh/sepalang/padoc/tree/master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d09a4868f68041fb8a1647f740e535f3)](https://www.codacy.com/app/labeldock/padoc?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=sepalang/padoc&amp;utm_campaign=Badge_Grade)

# PADOC
It is a tool for extracting compilation and distribution source with a simple command library written in es6.


## Install
```
npm i @sepalang/padoc
```


## Usage

### ES6 each module compile
```
padoc src dist -m umd

# long
padoc src dist --module umd
```
> It will be start recursive compile

### Compiling to a single chunk
```
padoc --pack src/index.js dist/onefile.js -m umd
padoc --pack src/index.js dist/onefile.js -m iife -n iQuery

# long
padoc --pack src/index.js dist/onefile.js --module umd
padoc --pack src/index.js dist/onefile.js --module iife --name iQuery

```

### no compile single chunk
```
padoc --pack src/index.js dist/onefile.js -m es
```

> It will be other files with dependencies will be stored in a single file. (By import or require)


### Support sourcemaps
```
padoc src dist -s
padoc --pack src/index.js dist/index.js -s

# long
padoc src dist --sourcemaps
padoc --pack src/index.js dist/index.js --sourcemaps
```

### multiple chunk
```
padoc --pack 'src/foo.js src/bar.js' dist/dirname -m es
padoc --pack 'src/globfile-*.js' dist/dirname -m es
```

### Execute ES6 file
```
padoc --exec index.js
```

### Execute and REPL
Can access variables exports to a running file. Restrictions on babel-node may occur.
```
padoc --exec index.js -i

# long
padoc --exec index.js --interactive
```

### Test
spec.js 나 test.js로 파일 이름이 끝나는 파일을 jest를 이용하여 테스트합니다.
```
my padoc --test sample/src

# test name pattern
my padoc --test sample/src --pattern testname
my padoc --test sample/src -p testname

# verbose
my padoc --test sample/src --verbose
```


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

