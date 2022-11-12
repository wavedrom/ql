'use strict';

const {EditorState} = require('@codemirror/state');
const {EditorView, highlightActiveLine, keymap, gutter} = require('@codemirror/view');
const {history, defaultKeymap, historyKeymap} = require('@codemirror/commands');
const {completionKeymap, autocompletion} = require('@codemirror/autocomplete');

const extMainTheme = require('./ext-main-theme.js');
const extReadOnlyTogglerWith = require('./ext-read-only-toggler-with.js');
// const extEdiatableTogglerWith = require('./ext-editable-toggler-with.js');
const extWaveqlLangWith = require('./ext-waveql-lang-with.js');
const extChangeWith = require('./ext-change-with.js');
const waveqlCompletionsWith = require('./waveql-completions-with.js');

const mountCodeMirror6 = (sidebar, deso, pstate, render) => {
  const sidebarState = EditorState.create({
    doc: deso.waveql,
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
      extWaveqlLangWith(deso.wires),
      autocompletion({override: [waveqlCompletionsWith(deso)]}),
      extChangeWith(deso, pstate, render),
      extReadOnlyTogglerWith('Alt-/', true),
      // extEdiatableTogglerWith('Alt-/', true),
      gutter({class: 'cm-wd-gutter'})
    ]
  });

  const view = new EditorView({state: sidebarState, parent: sidebar});

  view.scrollDOM.addEventListener('scroll', () => {
    const rect = view.contentDOM.getBoundingClientRect();
    // console.log('scroll scrollDOM', rect.top);
    pstate.yOffset = pstate.topBarHeight - rect.top;
    render();
  });

  document.addEventListener('scroll', () => {
    const rect = view.contentDOM.getBoundingClientRect();
    // console.log('scroll document', rect.top);
    pstate.yOffset = pstate.topBarHeight - rect.top;
    render();
  });

  // dummy change to trigger docChanged event
  view.dispatch({changes: {from: 0, insert: ' '}});
  view.dispatch({changes: {from: 0, to: 1, insert: ''}});

  return {
    getScrollInfo: () => {
      const rect = view.contentDOM.getBoundingClientRect();
      // console.log(rect);
      return {
        top: rect.top,
        clientHeight: rect.height
      };
    },
    scrollTo: (a, y) => {
      console.log('scrollTo', a, y);
      // view.scrollDOM.scrollTop = y;
      // view.dispatch({

      // });
      // view.requestMeasure({
      //   read() {
      //     return {
      //       selection: view.state.selection.main
      //     };
      //   },
      //   write({selection}) {
      //     view.scrollPosIntoView(selection.from);
      //   }
      //   // read () {
      //   //   return {};
      //   // },
      //   // write () {
      //   //   view.scrollDOM.scrollTop = y;
      //   // }
      // });
    },
    hasFocus: () => view.hasFocus // cm.hasFocus()
  };

};

module.exports = mountCodeMirror6;
