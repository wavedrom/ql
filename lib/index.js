'use strict';

const pkg = require('../package.json');
const tokenizer = require('./tokenizer.js');
const lexer = require('./lexer.js');
const parse = require('./parse.js');
const mountCodeMirror6 = require('./mount-codemirror6.js');

exports.version = pkg.version;
exports.tokenizer = tokenizer;
exports.lexer = lexer;
exports.parse = parse;
exports.mountCodeMirror6 = mountCodeMirror6;
