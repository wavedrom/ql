'use strict';

const {expect} = require('chai');
const format = require('../lib/format.js');

const fp64_2bigint = (val) => {
  const buf = new ArrayBuffer(8);
  const bufFloat = new Float64Array(buf);
  const bufBInt = new BigInt64Array(buf);
  bufFloat[0] = val;
  return bufBInt[0];
};

const fp32_2bigint = (val) => {
  const buf = new ArrayBuffer(4);
  const bufFloat = new Float32Array(buf);
  const bufUInt = new Uint32Array(buf);
  bufFloat[0] = val;
  return bufUInt[0];
};

console.log(fp64_2bigint(123.456).toString(16));
console.log(fp32_2bigint(123.456).toString(16));

const tt = [
  {fmt: '%b',    val: 12345678n, len: 24, res: '101111000110000101001110'},
  {fmt: '%o',    val: 12345678n, len: 24, res: '57060516'},
  {fmt: '%d',    val: 12345678n, len: 24, res: '12345678'},
  {fmt: '%h',    val: 12345678n, len: 24, res: 'bc614e'},

  {fmt: '%sb',   val: 5n, len: 3, res: '-11'},
  {fmt: '%so',   val: 5n, len: 3, res: '-3'},
  {fmt: '%sd',   val: 5n, len: 3, res: '-3'},
  {fmt: '%sh',   val: 5n, len: 3, res: '-3'},

  {fmt: '%sb',   val: 12345678n, len: 24, res: '-10000111001111010110010'},
  {fmt: '%so',   val: 12345678n, len: 24, res: '-20717262'},
  {fmt: '%sd',   val: 12345678n, len: 24, res: '-4431538'},
  {fmt: '%sh',   val: 12345678n, len: 24, res: '-439eb2'},

  {fmt: '%sb',   val: 12345678n, len: 42, res: '101111000110000101001110'},
  {fmt: '%so',   val: 12345678n, len: 42, res: '57060516'},
  {fmt: '%sd',   val: 12345678n, len: 42, res: '12345678'},
  {fmt: '%sh',   val: 12345678n, len: 42, res: 'bc614e'},

  {fmt: '%A',    val: 0x4142434445n, len: 40, res: 'ABCDE'},

  {fmt: '%sh',   val: 12345678n, len: 42, res: 'bc614e'},

  {fmt: '%f64',   val: 0x405edd2f1a9fbe77n, len: 64, res: '123.456'},
  {fmt: '%f32',   val: 0x42f6e979n, len: 32, res: '123.45600128173828'},

];

describe('format', () => {
  for (const te of tt) {
    it('t:' + te.fmt + ':' + te.val + ':' + te.len, async () => {
      expect(format(te.fmt, te.len)(te.val)).to.eq(te.res);
    });
  }
});

/* eslint-env mocha */
