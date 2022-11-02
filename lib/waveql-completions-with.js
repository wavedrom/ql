'use strict';

// signal autocomplete
// https://codemirror.net/examples/autocompletion/
const waveqlCompletionsWith = (/* deso */) => {
  // const {wires} = deso;
  return (context) => {
    const word = context.matchBefore(/\w*/);
    if (word.from == word.to && !context.explicit) {
      return null;
    }
    const cursor = context.state.selection.main.head; // getCursor
    const token = context.tokenBefore(['namespace', 'variableName']);
    // const cursorLine = context.state.doc.line(n + 1).text; // getLine
    // const line = cm.getLine(cursor.line);
    // const
    // const foo = context.state.values.find(e => e.tree).tree.resolve(word.from); // Tree(context.state);
    const foo = context.state.values.find(e => e.tree).tree;
    console.log(context, word, cursor, token, foo);
    return {
      from: word.from,
      options: [
        {label: 'match', type: 'keyword'},
        {label: 'hello', type: 'variable', info: '(World)'},
        {label: 'magic', type: 'text', apply: '⠁⭒*.✩.*⭒⠁', detail: 'macro'}
      ]
    };
  };
};

module.exports = waveqlCompletionsWith;
