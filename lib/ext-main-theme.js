'use strict';

const {EditorView} = require('@codemirror/view');

// https://codemirror.net/examples/styling/

const sidebarStylo = {
  '&': {
    color: '#eee',
    backgroundColor: '#0000001c',
    // top: '20px',
    // display: 'block',
    height: '100%', // codemirror to fill vertical space
    // maxHeight: 'calc(100% - 40px)', // editor grow until it reaches a maximum height, and scroll from that point on
    // maxHeight: 'calc(100% - 40px)', // editor grow until it reaches a maximum height, and scroll from that point on
    // height: 'calc(100% - 40px)',
    // left: '0px',
    // overflow: 'hidden',
    'scrollbar-width': 'thin',          /* "auto" or "thin" */
    'scrollbar-color': 'blue orange',   /* scroll thumb and track */   // padding: 0px;
  },
  '.cm-gutters': {
    backgroundColor: '#00000000'
  },
  '.cm-wd-gutter': {
    width: 8
  },
  '.cm-editor': {
    // display: 'block',
    // height: 'calc(100% - 40px)',
    // maxHeight: 'calc(100% - 40px)', // editor grow until it reaches a maximum height, and scroll from that point on
    // maxHeight: '100%', // editor grow until it reaches a maximum height, and scroll from that point on
    // height: '100%', // codemirror to fill vertical space
    // minHeight: '100%',
    // maxHeight: '100%'
  },
  '.cm-content': {
    // caretColor: '#3ff',
    fontFamily: 'Iosevka',
    lineHeight: 1.5,
    fontSize: '16px',
    width: '100%',
    // top: '20px',
    // bottom: '20px'
  },
  '.cm-scroller': {
    maxHeight: '100%', // editor grow until it reaches a maximum height, and scroll from that point on
    // maxHeight: 'calc(100% - 40px)', // editor grow until it reaches a maximum height, and scroll from that point on
    // overflowY: 'auto',
    overflowX: 'hidden',
  },
  '.cm-activeLine': {
    backgroundColor: '#00aaff10',
  }
};

const extMainTheme = EditorView.theme(sidebarStylo, {dark: true});

module.exports = extMainTheme;
