'use strict';

const parse = str => {
  const arr1 = str.split('\n');

  let path = []; // start from root
  const arr2 = arr1
    .map(line => line.trim()) // ignore whitespace around
    .map(line => {
      if (line === '') {
        return {kind: 'empty', path: path.slice()};
      }
      const parts = line.split('/');
      const partLast = parts.length - 1;

      let res = {
        kind: 'strange',
        orig: line
      };

      parts.map((part, i) => {
        if (i === partLast) {
          if (part === '') {
            res = {kind: 'empty', path: path.slice()};
            return;
          }
          if (part.match(/^\w+$/)) {
            res = {kind: 'signal', id: part, path: path.slice()};
            return;
          }
        } else {
          if (part.match(/^\w+$/)) {
            path.push(part);
            return;
          }
        }
        if (i === 0) {
          if (part === '') {
            path = []; // jump to root
            return;
          }
        } else
        if (part === '.') {
          return;
        }
        if (part === '..') {
          path.pop();
          return;
        }
        if (part === '...') {
          path.pop();
          path.pop();
          return;
        }
      });

      return res;
    });
  return arr2;
};

module.exports = parse;
