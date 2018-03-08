#!/usr/bin/env node

console.log("padoc command!");
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
