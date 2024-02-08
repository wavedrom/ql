'use strict';

const format = (fmt, len) => {
  {
    const m1 = fmt.match(/^%(?<sign>[s])?(?<radix>[bodh])$/);
    len = BigInt(len);
    if (m1) {
      const p = m1.groups;
      const radix = ({b: 2, o: 8, d: 10, h: 16, H: 16})[p.radix];
      return (val) => {
        if (p.sign === 's') {
          const sign = (val >> (len - 1n)) & 1n;
          if (sign) {
            val = val - (2n ** len);
          }
        }
        let res = val.toString(radix);
        return res;
      };
    }
  } {
    const m2 = fmt.match(/^%A$/);
    if (m2) {
      return (val) => {
        let txtRes = '';
        for (let i = 0n; i < len; i += 8n) {
          txtRes = String.fromCharCode(Number((val >> i) & 0xffn)) + txtRes;
        }
        return txtRes;
      };
    }
  } {
    const m3 = fmt.match(/^%f64$/);
    if (m3) {
      return (val) => {
        const buf = new ArrayBuffer(8);
        const bufFloat = new Float64Array(buf);
        const bufBInt = new BigInt64Array(buf);
        bufBInt[0] = val & 0xffffffffffffffffn;
        return bufFloat[0].toString();
      };
    }
  } {
    const m3 = fmt.match(/^%f32$/);
    if (m3) {
      return (val) => {
        const buf = new ArrayBuffer(4);
        const bufFloat = new Float32Array(buf);
        const bufUInt = new Uint32Array(buf);
        bufUInt[0] = Number(val & 0xffffffffn);
        return bufFloat[0].toString();
      };
    }
  }
};


module.exports = format;
