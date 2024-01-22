'use strict';

const {EditorView} = require('@codemirror/view');

const langParser = require('./lang-parser.js');
const waveQlLang = require('./waveql-lang.js');
const dictionary = require('./dictionary.js');

const extChangeWith = (deso, pstate) => {
  const updater = deso.updater || (() => {});
  const lang = waveQlLang(deso.wires, dictionary);
  return EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      const str = update.state.doc.toString();
      const parser = langParser(lang);
      const stt = parser(str);
      deso.view = stt.rows;
      pstate.numLanes = deso.view.length;
      pstate.pathTrace = stt.pathTrace;
      updater(str);
      deso.render();
    }
  });
};

module.exports = extChangeWith;
