'use strict';

const {StreamLanguage, syntaxHighlighting, HighlightStyle} = require('@codemirror/language');
const {tags} = require('@lezer/highlight');

const get = require('lodash.get');

// waveql syntax
// https://codemirror.net/docs/ref/#language.StreamLanguage

const waveQlLang = wires => ({
  startState: function() {
    return {path: []};
  },
  token: function (stream, stt) {
    let mat;

    if (stream.eatSpace()) { return null; }

    mat = stream.match(/^@\d+[munpf]*s(\.\w+)*$/); if (mat) { return 'unit'; }

    mat = stream.match(/^\.\.\.(\s+|$)/); if (mat) { stt.path.pop(); stt.path.pop(); return 'punctuation'; }
    mat = stream.match(/^\.\.(\s+|$)/);   if (mat) { stt.path.pop(); return 'punctuation'; }
    mat = stream.match(/^\.(\s+|$)/);     if (mat) { return 'punctuation'; }
    mat = stream.match(/^\/(\s+|$)/);     if (mat) { stt.path.length = 0; return 'punctuation'; }

    mat = stream.match(/^:(\S+)(\s+|$)/); if (mat) {
      return 'labelName';
    }

    mat = stream.match(/^\{[^}]+\}(\s+|$)/); if (mat) {
      return 'brace';
    }

    mat = stream.match(/^%([<>^])?([+-])?([su])?([bodhHac])(\s+|$)/); if (mat) {
      return 'attributeName';
    }

    mat = stream.match(/^(\S+)(\s+|$)/); if (mat) {
      const sigName = mat[1];
      const newPath = stt.path.concat(sigName);
      const ref = get(wires, newPath, false);
      // console.log(wires, newPath, ref);
      if (typeof ref === 'string') {
        return 'variableName';
      }
      if (typeof ref === 'object') {
        stt.path = newPath;
        return 'namespace';
      }
      return 'comment';
    }
  }
});

const sidebarHighlightStyleGen = t => [
  {tag: [t.punctuation],    background: '#000'},
  {tag: [t.variableName],   background: '#000', color: 'hsl(56, 100%, 68%)'},
  {tag: [t.labelName],      background: '#000', color: 'hsl(175, 100%, 86%)', fontWeight: 'bold'},
  {tag: [t.namespace],      background: '#000', color: 'hsl(202, 100%, 66%)', fontWeight: 'bold'},
  {tag: [t.attributeName],  background: '#000', color: 'hsl(202, 100%, 66%)', fontWeight: 'bold'},
  {tag: [t.brace],          background: '#000', color: 'hsl(278, 100%, 79%)', fontWeight: 'bold'},
  {tag: [t.unit],           background: '#000', color: 'hsl(333, 100%, 80%)'}
];

const extWaveqlLangWith = (wires) => {
  // console.log(wires);
  return [
    StreamLanguage.define(waveQlLang(wires)),
    syntaxHighlighting(HighlightStyle.define(sidebarHighlightStyleGen(tags)))
  ];
};

module.exports = extWaveqlLangWith;
