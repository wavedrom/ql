'use strict';

const {expect} = require('chai');
const format = require('../lib/format.js');

const tt = [
  {fmt: 'b', val: 12345678n, len: 16, res: '101111000110000101001110'},
  {fmt: 'o', val: 12345678n, len: 16, res: '57060516'},
  {fmt: 'd', val: 12345678n, len: 16, res: '12345678'},
  {fmt: 'h', val: 12345678n, len: 16, res: 'bc614e'}
];

describe('format', () => {
  for (const te of tt) {
    it('t:' + te.fmt + ':' + te.val + ':' + te.len, async () => {
      expect(format(te.fmt, te.val, te.len)).to.eq(te.res);
    });
  }
});

/* eslint-env mocha */
