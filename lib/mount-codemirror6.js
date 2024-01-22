'use strict';

const {EditorView} = require('@codemirror/view');

const mountCodeMirror6 = (sidebarState, sidebar, deso, pstate) => {
  const view = new EditorView({state: sidebarState, parent: sidebar});

  view.scrollDOM.addEventListener('scroll', () => {
    const rect = view.contentDOM.getBoundingClientRect();
    pstate.yOffset = pstate.topBarHeight - rect.top;
    deso.render();
  });

  document.addEventListener('scroll', () => {
    const rect = view.contentDOM.getBoundingClientRect();
    pstate.yOffset = pstate.topBarHeight - rect.top;
    deso.render();
  });

  // dummy change to trigger docChanged event
  // view.dispatch({changes: {from: 0, insert: ' '}});
  // view.dispatch({changes: {from: 0, to: 1, insert: ''}});

  return {
    getScrollInfo: () => {
      const rect = view.contentDOM.getBoundingClientRect();
      return {
        top: rect.top,
        clientHeight: rect.height
      };
    },
    scrollTo: (/*a, y*/) => {
    },
    view,
    hasFocus: () => view.hasFocus // cm.hasFocus()
  };

};

module.exports = mountCodeMirror6;

/* eslint-env browser */
