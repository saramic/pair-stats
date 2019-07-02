#!/usr/bin/env node

var argv = require('yargs')
  .usage('Usage: $0 <path to git directory defaults to . >')
  .example('$0', 'analyse the git repo in the current directory')
  .example(
    '$0 path/to/git/repo',
    'analyse the git repo in the path/to/git/repo directory'
  ).argv;

// TODO: how better to write to output, pass a stream writer?
console.log(require('../dist/cli').cli(argv._));
