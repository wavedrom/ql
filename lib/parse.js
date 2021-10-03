'use strict';

const strangeErr = (line, lineIdx) =>
  new Error('Strange line : [' + lineIdx + '] :' + line);

const parse = str => {
  const arr1 = str.split('\n');

  let path = []; // start from root
  const arr2 = arr1
    .map(line => line.trim()) // ignore whitespace around
    .map((line, lineIdx) => {
      if (line === '') {
        return {kind: 'empty', path: path.slice()};
      }
      const parts = line.split('/');
      const partLen = parts.length;

      // hierarchy portion
      for (let i = 0; i < (partLen - 1); i++) {
        const part = parts[i];
        if (part === '.') {
          continue;
        }
        if (part === '..') {
          path.pop();
          continue;
        }
        if (part.match(/^\w+$/)) {
          path.push(part);
          continue;
        }
        throw strangeErr(line, lineIdx);
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
