'use strict';

const {EditorState} = require('@codemirror/state');
const {EditorView, highlightActiveLine, keymap} = require('@codemirror/view');
const {history, defaultKeymap, historyKeymap} = require('@codemirror/commands');
const {completionKeymap, autocompletion} = require('@codemirror/autocomplete');

const extMainTheme = require('./ext-main-theme.js');
const extReadOnlyTogglerWith = require('./ext-read-only-toggler-with.js');
const extWaveqlLang = require('./ext-waveql-lang.js');
const extChange = require('./ext-change.js');

const getElement = divName => {
  if (typeof divName === 'string') {
    const c = document.getElementById(divName);
    if (c === null) {
      throw new Error('<div> element width Id: "' + divName + '" not found');
    }
    return c;
  }
  return divName;
};

const initText = `\
top .. top
clock :clock
reset

(DIZ

)

data %d
addr
valid :valid
ready :ready
{clock,valid,ready,up:4}

very long line very long line very long line very long line very long line

addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
`;


// TODO

// signal autocomplete
// https://codemirror.net/examples/autocompletion/
const waveQlCompletions = (context) => {
  const word = context.matchBefore(/\w*/);
  console.log(word);
  if (word.from == word.to && !context.explicit) {
    return null;
  }
  return {
    from: word.from,
    options: [
      {label: 'match', type: 'keyword'},
      {label: 'hello', type: 'variable', info: '(World)'},
      {label: 'magic', type: 'text', apply: '⠁⭒*.✩.*⭒⠁', detail: 'macro'}
    ]
  };
};


// Migration
// https://codemirror.net/docs/migration/


global.MAIN = async (div) => {
  const root = getElement(div);
  // console.log(cmLanguage);

  const sidebarState = EditorState.create({
    doc: initText,
    extensions: [
      history(),
      highlightActiveLine(),
      keymap.of([
        // no Tabs https://codemirror.net/examples/tab/
        ...completionKeymap,
        ...defaultKeymap,
        ...historyKeymap
      ]),
      extMainTheme,
      extWaveqlLang,
      autocompletion({override: [waveQlCompletions]}),
      extChange,
      extReadOnlyTogglerWith('Ctrl-,'),
    ]
  });

  const view = new EditorView({state: sidebarState, parent: root});

  view.scrollDOM.addEventListener('scroll', () => {
    console.log(view.contentDOM.getBoundingClientRect().top);
  });

};

/* eslint-env browser */
