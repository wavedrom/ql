'use strict';

const pkg = require('../package.json');
const parse = require('./parse.js');

exports.version = pkg.version;
exports.parse = parse;
