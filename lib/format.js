'use strict';

const format = (fmt, val /*, len*/ ) => {
  if (fmt === 'b') {
    return val.toString(2);
  }
  if (fmt === 'o') {
    return val.toString(8);
  }
  if (fmt === 'd') {
    return val.toString(10);
  }
  if (fmt === 'h') {
    return val.toString(16);
  }

  return val.toString();
};


module.exports = format;
