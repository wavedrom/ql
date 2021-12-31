'use strict';

const chai = require('chai');
const { tokenizer } = require('../lib');

const expect = chai.expect;

const testo = {
  t0: {
    src: '',
    res: []
  },
  t1: {
    src: 'foo',
    res: [{ idx: 3, row: 0, col: 3, token: 'foo' }]
  },
  t1a: {
    src: ' \n foo \n\n',
    res: [{ idx: 6, row: 1, col: 4, token: 'foo' }]
  },
  t2: {
    src: ' \n foo \n\n bar',
    res: [
      { idx: 6,  row: 1, col: 4, token: 'foo' },
      { idx: 13, row: 3, col: 4, token: 'bar' }
    ]
  },
  t42: {
    src: '( foo \t \v \r bar\n baz )\n',
    res: [
      { idx: 1,  row: 0, col: 1,  token: '('   },
      { idx: 5,  row: 0, col: 5,  token: 'foo' },
      { idx: 15, row: 0, col: 15, token: 'bar' },
      { idx: 20, row: 1, col: 4,  token: 'baz' },
      { idx: 22, row: 1, col: 6,  token: ')'   }
    ]
  }
};

const failo = {
  'number': 42,
  'undefined': undefined,
  'object': {}
};

describe('lexer', () => {

  Object.keys(testo).map(test => {
    it(test, () => {
      const val = testo[test];
      const tokens = tokenizer(val.src);
      const res = [];
      for (const token of tokens) {
        res.push(token);
      }
      // console.log(res);
      expect(res).deep.equal(val.res);
    });
  });

  Object.keys(failo).map(test => {
    it('fail ' + test, () => {
      const val = failo[test];
      expect(() => {
        tokenizer(val).next();
      }).to.throw(TypeError, test);
    });
  });

});

/* eslint-env mocha */
