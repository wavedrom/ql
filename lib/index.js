'use strict';

const pkg = require('../package.json');
const tokenizer = require('./tokenizer.js');
const lexer = require('./lexer.js');
const parse = require('./parse.js');

exports.version = pkg.version;
exports.tokenizer = tokenizer;
exports.lexer = lexer;
exports.parse = parse;
