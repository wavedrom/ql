'use strict';

const tokenizer = require('./tokenizer.js');

const lut = {
  '%': token => { token.kind = 'format'; },
  '.': token => { token.kind = 'cd'; },
  '/': token => { token.kind = 'cd'; }
};

function* lexer(str) {
  const tknzr = tokenizer(str);
  for (const token of tknzr) {
    const name = token.token;
    const c0 = name.charAt(0);
    const f0 = lut[c0];
    if (f0 !== undefined) {
      f0(token);
    }
    yield token;
  }
}

module.exports = lexer;
