'use strict';

const chai = require('chai');
const { lexer } = require('../lib');

const expect = chai.expect;

const testo = {
  t42: {
    src: `\
    foo %b
    ./bar
    ./bar/baz

    dir/
  ./_fuz42
   ../../bam

`,
    res: [
      { idx: 7, row: 0, col: 7, token: 'foo' },
      { idx: 10, row: 0, col: 10, token: '%b', kind: 'format' },
      { idx: 20, row: 1, col: 9, token: './bar', kind: 'cd' },
      { idx: 34, row: 2, col: 13, token: './bar/baz', kind: 'cd' },
      { idx: 44, row: 4, col: 8, token: 'dir/' },
      { idx: 55, row: 5, col: 10, token: './_fuz42', kind: 'cd' },
      { idx: 68, row: 6, col: 12, token: '../../bam', kind: 'cd' }
    ]
  }
};

describe('lexer', () => {

  Object.keys(testo).map(test => {
    it(test, () => {
      const val = testo[test];
      const tokens = lexer(val.src);
      const res = [];
      for (const token of tokens) {
        res.push(token);
      }
      // console.log(res);
      expect(res).deep.equal(val.res);
    });
  });

});

/* eslint-env mocha */
