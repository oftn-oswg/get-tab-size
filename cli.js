#!/usr/bin/env node

var getTabSize = require('./.');

var chunks = [];
process.stdin.resume();
process.stdin.on('data', chunks.push.bind(chunks));
process.stdin.on('end', function () {
  console.log(getTabSize(Buffer.concat(chunks).toString()));
});
