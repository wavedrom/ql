'use strict';

const {EditorView} = require('@codemirror/view');

const waveqlParserWith = require('./waveql-parser-with.js');

const extChangeWith = (deso, pstate, render) => {
  const parser = waveqlParserWith(deso.wires);
  return EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      const str = update.state.doc.toString();
      deso.view = parser(str);
      pstate.numLanes = deso.view.length;
      render();
    }
  });
};

module.exports = extChangeWith;
