'use strict';

const getSig = require('./get-sig.js');
const getScopeType = require('./get-scope-type.js');
const getVarType = require('./get-var-type.js');

const findPath = (pos, pathTrace) => {
  let path = [];
  for (const item of pathTrace) {
    if (item[0] > pos) {
      break;
    }
    path = item[1];
  }
  return path;
};

// signal autocomplete
// https://codemirror.net/examples/autocompletion/

const waveqlCompletionsWith = (deso, pstate) => {
  // const {wires} = deso;
  return (context /* : CompletionContext */) => {
    const word = context.matchBefore(/[\w_.()[\]]+/);
    if (!word || word.from == word.to && !context.explicit) {
      return null;
    }

    const path = findPath(word.from, pstate.pathTrace);
    const scope = getSig(deso.wires, path);

    const options = (scope.body || []).map(ero => {
      const type = (
        (ero.kind === 'var') ? ero.kind + '-' + getVarType(ero.type).icon :
          (ero.kind === 'scope') ? ero.kind + '-' + getScopeType(ero.type).icon :
            undefined
      );
      return {label: ero.name, type};
    });
    return {
      from: word.from,
      options
    };
  };
};

module.exports = waveqlCompletionsWith;
