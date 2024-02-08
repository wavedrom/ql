'use strict';

const {expect} = require('chai');
const format = require('../lib/format.js');

const tt = [
  {fmt: '%b',    val: 12345678n, len: 24, res: '101111000110000101001110'},
  {fmt: '%o',    val: 12345678n, len: 24, res: '57060516'},
  {fmt: '%d',    val: 12345678n, len: 24, res: '12345678'},
  {fmt: '%h',    val: 12345678n, len: 24, res: 'bc614e'},
  {fmt: '%H',    val: 12345678n, len: 24, res: 'BC614E'},

  {fmt: '%sb',   val: 5n, len: 3, res: '-11'},
  {fmt: '%so',   val: 5n, len: 3, res: '-3'},
  {fmt: '%sd',   val: 5n, len: 3, res: '-3'},
  {fmt: '%sh',   val: 5n, len: 3, res: '-3'},

  {fmt: '%sb',   val: 12345678n, len: 24, res: '-10000111001111010110010'},
  {fmt: '%so',   val: 12345678n, len: 24, res: '-20717262'},
  {fmt: '%sd',   val: 12345678n, len: 24, res: '-4431538'},
  {fmt: '%sh',   val: 12345678n, len: 24, res: '-439eb2'},
  {fmt: '%sH',   val: 12345678n, len: 24, res: '-439EB2'},

  {fmt: '%sb',   val: 12345678n, len: 42, res: '101111000110000101001110'},
  {fmt: '%so',   val: 12345678n, len: 42, res: '57060516'},
  {fmt: '%sd',   val: 12345678n, len: 42, res: '12345678'},
  {fmt: '%sh',   val: 12345678n, len: 42, res: 'bc614e'},

  {fmt: '%A',    val: 0x4142434445n, len: 40, res: 'ABCDE'},
];

describe('format', () => {
  for (const te of tt) {
    it('t:' + te.fmt + ':' + te.val + ':' + te.len, async () => {
      expect(format(te.fmt, te.val, te.len)).to.eq(te.res);
    });
  }
});

/* eslint-env mocha */
