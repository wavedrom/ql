'use strict';

const WS = /[ \f\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/;
const LF = /[\n]/;

function* tokenizer (src) {
  // console.log(src);
  if (typeof src !== 'string') {
    throw new TypeError('tokenizer: got "' + (typeof src) + '", expected "string"');
  }
  const len = src.length;
  let row = 0;
  let col = 0;
  let token = '';
  for (let idx = 0; idx < len; idx++) {
    // console.log(token);
    const c = src.charAt(idx);
    if (WS.test(c)) {
      if (token.length > 0) {
        yield {idx, row, col, token};
        token = '';
      }
      col += 1;
    } else
    if (LF.test(c)) {
      if (token.length > 0) {
        yield {idx, row, col, token};
        token = '';
      }
      row += 1;
      col = 0;
    } else {
      token += c;
      col += 1;
    }
  }
  if (token.length > 0) {
    yield {idx: len, row, col, token};
  }
}

module.exports = tokenizer;
