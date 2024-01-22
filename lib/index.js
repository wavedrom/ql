'use strict';

const pkg = require('../package.json');
const langParser = require('./lang-parser.js');
const waveQlLang = require('./waveql-lang.js');
const mountCodeMirror6 = require('./mount-codemirror6.js');
const createCodeMirrorState = require('./create-code-mirror-state.js');

exports.version = pkg.version;
exports.langParser = langParser;
exports.waveQlLang = waveQlLang;
exports.mountCodeMirror6 = mountCodeMirror6;
exports.createCodeMirrorState = createCodeMirrorState;
