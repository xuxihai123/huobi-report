#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var path = require('path');
var main = require('../index');
var cwd = process.cwd();

program
  .version('0.0.1')
  .usage('[options] <file>')
  .option('-x,--xls <xls file>', 'parse xls file');
program.on('--help', function() {
  console.log(' please email to x373241884y@email.com');
  console.log(' QQ:373241884');
});
program.parse(process.argv);

if (program.xls) {
  let filepath = program.xls;
  if (!path.isAbsolute(program.xls)) {
    filepath = path.resolve(cwd, program.xls);
  }
  const buffer = fs.readFileSync(filepath);
  main(program.xls);
} else {
  program.help();
}
