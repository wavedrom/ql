'use strict';

const format = (fmt, val, len) => {
  const m1 = fmt.match(/^%(?<sign>[s])?(?<radix>[bodhH])$/);
  len = BigInt(len);
  if (m1) {
    const p = m1.groups;
    const radix = ({b: 2, o: 8, d: 10, h: 16, H: 16})[p.radix];
    if (p.sign === 's') {
      const sign = (val >> (len - 1n)) & 1n;
      if (sign) {
        val = val - (2n ** len);
      }
    }
    let res = val.toString(radix);
    if (p.radix === 'H') {
      return res.toUpperCase();
    }
    return res;
  }
  const m2 = fmt.match(/^%A$/);
  if (m2) {
    let txtRes = '';
    for (let i = 0n; i < len; i += 8n) {
      txtRes = String.fromCharCode(Number((val >> i) & 0xffn)) + txtRes;
    }
    return txtRes;
  }
};


module.exports = format;
