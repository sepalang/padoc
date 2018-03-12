module.exports = {
  "env": {
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "no-console"           : 0,
    "dot-notation"         : 0,
    "no-else-return"       : 0,
    "camelcase"            : 0,
    "no-fallthrough"       : 0,
    "linebreak-style"      : 0,
    "consistent-return"    : 0,
    "no-useless-escape"    : 0,
    "eqeqeq"               : 0,
    "no-plusplus"          : 0,
    "max-len"              : 0,
    "no-shadow"            : 0,
    "quotes"               : 0,
    "prefer-destructuring" : 0,
    "padded-blocks"        : 0,
    "no-param-reassign"    : 0,
    "no-prototype-builtins": 0,
    "vars-on-top"          : 0,
    "no-var"               : 0,
    "no-unused-expressions": 0,
    "no-sequences"         : 0,
    "no-nested-ternary"    : 0,
    "no-restricted-globals": 0,
    "prefer-const"         : 0,
    "prefer-rest-params"   : 1,
    "radix"                : 1,
    "no-use-before-define" : 1,
    
    "indent"               : ["error", 2, { "MemberExpression": 0, "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }],
    "quote-props"          : ["error", "consistent"],
    "no-unused-vars"       : ["error", { "vars": "all", "args": "none", "ignoreRestSiblings": false }],
    "semi"                 : ["error", "never"],
    "comma-dangle"         : ["error", {
      "arrays": "only-multiline",
      "objects": "only-multiline",
      "imports": "only-multiline",
      "exports": "only-multiline",
      "functions": "never"
    }],
    "arrow-spacing"       : ["error", {
      "before": false,
      "after": false 
    }],
    "keyword-spacing"     : ["error", { 
      "before": true, 
      "after": true,
      "overrides": {
        "if": { "after": false },
        "for": { "after": false },
        "while": { "after": false }
      }
    }],
    "key-spacing": ["error", {
      "singleLine": {
        "beforeColon": false,
        "afterColon": true
      },
      "multiLine": {
        "beforeColon": false,
        "afterColon": true,
        "align": "colon"
      }
    }],
    "import/first"         : 0,
    "import/prefer-default-export" : 0
  }
};