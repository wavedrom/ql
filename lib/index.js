'use strict';

const pkg = require('../package.json');
const tokenizer = require('./tokenizer.js');
const parse = require('./parse.js');

exports.version = pkg.version;
exports.tokenizer = tokenizer;
exports.parse = parse;
