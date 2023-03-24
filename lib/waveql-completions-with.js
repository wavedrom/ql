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

    // console.log('word:', word);

    // console.log('context:', context);

    // const cursor = context.state.selection.main.head; // getCursor

    // console.log('cursor:', cursor);

    // const token = context.tokenBefore(['namespace', 'variableName']);
    // const cursorLine = context.state.doc.line(n + 1).text; // getLine
    // const line = cm.getLine(cursor.line);
    // const
    // const foo = context.state.values.find(e => e.tree).tree.resolve(word.from); // Tree(context.state);

    // const values = context.state.values;

    // console.log('value:', values);

    // const tree = values.find(e => e.tree).tree;

    // console.log('tree:', tree);

    // const cursor = tree.cursor();

    // cursor.childBefore(word.from);
    // console.log('cursor node tree:', cursor.node.toTree());



    // const children = tree.children;
    // if (children.length !== 1) {
    //   console.log('$children', children);
    // }

    // const tree0 = children[0];
    // const tree1 = tree.resolve(word.from - 1, -1); // Tree(context.state);
    // const tree2 = tree.resolve(word.to); // Tree(context.state);
    // console.log('treeNodes:', tree0, tree1, tree2);

    // const props = tree0.props;
    // // const props = foo.props;

    // const propKeys = Object.keys(props);
    // if (propKeys.length !== 1) {
    //   console.log('$props', props);
    // }

    // const pathKey = propKeys.find(key => props[key].path);

    // const path = props[pathKey].path;
    // const scope = getSig(deso.wires, path);
    // console.log(JSON.stringify(path), scope);

    // const options = (scope.body || []).map(ero => {
    //   const type = (
    //     (ero.kind === 'var') ? ero.kind + '-' + getVarType(ero.type).icon :
    //       (ero.kind === 'scope') ? ero.kind + '-' + getScopeType(ero.type).icon :
    //         undefined
    //   );
    //   return {label: ero.name, type};
    // });
    // // console.log(context, word, cursor, token, foo, deso);
    // // console.log(deso);
    // return {
    //   from: word.from,
    //   options
    // };
  };
};

module.exports = waveqlCompletionsWith;
