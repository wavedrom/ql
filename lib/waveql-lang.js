'use strict';

const get = require('./get-sig.js');
const getScopeType = require('./get-scope-type.js');
const getVarType = require('./get-var-type.js');
const tracePath = require('./trace-path.js');

const findSignalWith = (wires) => (stream, stt, word) => {
  const newPath = stt.path.concat(word);
  const ero = get(wires, newPath, false);
  if (ero) {
    if (ero.kind === 'scope') {
      stt.path = newPath;
      tracePath(stream, stt);
      return (getScopeType(ero.type)).tag;
    }
    if (ero.kind === 'var') {
      // stt.varWidth = ero.size;
      const rowo = stt.rowo;
      rowo.width = ero.size;
      rowo.name = ero.name;
      rowo.ref = ero.link;
      return (getVarType(ero.type)).tag;
    }
  }
};

const findInDictionary = (wires) => (stream, stt, word) => {
  const dict = stt.dict;
  for (const item of dict) {
    const m = item.m;
    if (typeof m === 'string') {
      if (word === m) {
        return item.fn(stream, stt, m, wires);
      }
    } else {
      const mat = word.match(m);
      if (mat) {
        return item.fn(stream, stt, mat, wires);
      }
    }
  }
};

const waveQlLang = (wires, dict) => {
  const finders = [
    findSignalWith(wires), // instance / signal tree
    findInDictionary(wires), // direct or regex word match
    () => 'comment'
  ];
  return {
    startState: function() {
      return {path: [], dict, rows: [], labelo: {}, rStack: [], pathTrace: []};
    },
    blankLine: function (stt) {
      stt.rows.push({});
    },
    token: function (stream, stt) {
      if (stream.eatSpace()) {
        return null;
      }
      const mat = stream.match(/^(\S+)(\s+|$)/);
      if (mat) {
        const word = mat[1];
        if (stt.curStream !== stream) {
          stt.curStream = stream;
          const rowo = stt.rowo = {
            // raw: stream.string,
            idx: stt.rows.length
          };
          stt.rows.push(rowo);
        }
        for (const finder of finders) {
          const res = finder(stream, stt, word);
          if (res) {
            return res;
          }
        }
      } else {
        throw new Error(stream);
      }
    },
    languageData: {
      // commentTokens: {line: '//'}
    }
  };
};

module.exports = waveQlLang;
