'use strict';


// const {TreeCursor} = require('@lezer/common');

const getSig = require('./get-sig.js');
const getScopeType = require('./get-scope-type.js');
const getVarType = require('./get-var-type.js');

// signal autocomplete
// https://codemirror.net/examples/autocompletion/
const waveqlCompletionsWith = (deso) => {
  // const {wires} = deso;
  return (context /* : CompletionContext */) => {
    const word = context.matchBefore(/[\w_.()[\]]+/);
    if (!word || word.from == word.to && !context.explicit) {
      return null;
    }
    const values = context.state.values;
    const tree = values.find(e => e.tree).tree;
    const children = tree.children;
    const tree0 = children[0];
    const props = tree0.props;
    const propKeys = Object.keys(props);
    const pathKey = propKeys.find(key => props[key].path);

    const path = props[pathKey].path;
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
