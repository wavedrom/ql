'use strict';

const {EditorState} = require('@codemirror/state');
const {highlightActiveLine, keymap, gutter} = require('@codemirror/view');
const {history, defaultKeymap, historyKeymap} = require('@codemirror/commands');
const {completionKeymap, autocompletion} = require('@codemirror/autocomplete');

const extMainTheme = require('./ext-main-theme.js');
const extReadOnlyTogglerWith = require('./ext-read-only-toggler-with.js');
const extWaveqlLangWith = require('./ext-waveql-lang-with.js');
const extChangeWith = require('./ext-change-with.js');
const waveqlCompletionsWith = require('./waveql-completions-with.js');
const dictionary = require('./dictionary.js');

const createCodeMirrorState = (deso, pstate, extensions) =>
  EditorState.create({
    doc: deso.waveql,
    extensions: [
      // history(),
      ...(deso.hasHistory ? [history()] : []),
      highlightActiveLine(),
      keymap.of([
        // no Tabs https://codemirror.net/examples/tab/
        ...completionKeymap,
        ...defaultKeymap,
        ...(deso.hasHistory ? historyKeymap : [])
      ]),
      extMainTheme,
      extWaveqlLangWith(deso.wires, dictionary),
      autocompletion({override: [waveqlCompletionsWith(deso, pstate)]}),
      extChangeWith(deso, pstate),
      extReadOnlyTogglerWith('Alt-/', deso.isRO ? true : false),
      // extEdiatableTogglerWith('Alt-/', true),
      gutter({class: 'cm-wd-gutter'}),
      ...(extensions || [])
    ]
  });

module.exports = createCodeMirrorState;

/* eslint-env browser */
