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
    "no-console"       : ["error", { allow: ["log", "warn", "error"] }],
    "indent"           : ["error", 2, { "MemberExpression": 0, "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }],
    "linebreak-style"  : 0,
    "consistent-return": 0,
    "eqeqeq"           : 0,
    "max-len"          : 0,
    "quotes"           : 0,
    "quote-props"      : ["error", "consistent"],
    "no-unused-vars"   : ["error", { "vars": "all", "args": "none", "ignoreRestSiblings": false }],
    "no-shadow"        : ["error", { "hoist": "never", "allow":["resolve", "reject"] }],
    "semi"             : ["error", "never"], //always, never
    "comma-dangle"     : ["error", "only-multiline"],
    "arrow-spacing"    : ["error", { "before": false, "after": false }],
    "keyword-spacing"  : ["error", { 
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
    }]
  }
};