'use strict';

const parse = str => {
  const str1 = str.trim();
  const arr1 = str1.split('\n');
  const arr2 = arr1.map(e => e.trim());
  return arr2;
};

module.exports = parse;
