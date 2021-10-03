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
      const partLen = parts.length;

      // hierarchy portion
      for (let i = 0; i < (partLen - 1); i++) {
        const part = parts[i];
        if (i === 0 && part === '') {
          path = []; // jump to root
          continue;
        }
        if (part === '' || part === '.') {
          continue;
        }
        if (part === '..') {
          path.pop();
          continue;
        }
        if (part === '...') {
          path.pop();
          path.pop();
          continue;
        }
        if (part.match(/^\w+$/)) {
          path.push(part);
          continue;
        }
        return {
          kind: 'strange',
          orig: line
        };
      }

      const id = parts[partLen - 1];
      if (id.match(/^\w+$/)) {
        return {kind: 'signal', id, path: path.slice()};
      }

      if (id === '') {
        return {kind: 'empty', path: path.slice()};
      }

    });
  return arr2;
};

module.exports = parse;
