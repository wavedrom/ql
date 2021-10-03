'use strict';

const parse = str => {
  const arr1 = str.split('\n');

  const arr2 = arr1.map(line => line.trim());

  let path = [];
  const arr3 = arr2.map(line => {
    if (line === '') {
      return {};
    }
    const id = line;
    return {id, path};
  });
  return arr3;
};

module.exports = parse;
