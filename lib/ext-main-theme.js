'use strict';

const {EditorView} = require('@codemirror/view');

// https://codemirror.net/examples/styling/

const sidebarStylo = {
  '&': {
    color: '#eee',
    backgroundColor: '#0000001c',
    top: '20px',
    // height: '100%', // codemirror to fill vertical space
    maxHeight: 'calc(100% - 40px)', // editor grow until it reaches a maximum height, and scroll from that point on
    // height: 'calc(100% - 40px)',
    // left: '0px',
    // overflow: 'hidden',
    'scrollbar-width': 'thin',          /* "auto" or "thin" */
    'scrollbar-color': 'blue orange',   /* scroll thumb and track */   // padding: 0px;
  },
  '.cm-editor': {
    // height: '100%', // codemirror to fill vertical space
    // minHeight: '100%',
    // maxHeight: '100%'
  },
  '.cm-content': {
    // caretColor: '#3ff',
    fontFamily: 'Iosevka',
    lineHeight: 1.5,
    fontSize: '16px',
    // top: '20px',
    // bottom: '20px'
  },
  '.cm-scroller': {
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  '.cm-activeLine': {
    backgroundColor: '#00aaff10',
  }
};

const extMainTheme = EditorView.theme(sidebarStylo, {dark: true});

module.exports = extMainTheme;
