'use strict';

const {StreamLanguage, syntaxHighlighting, HighlightStyle} = require('@codemirror/language');
const {tags} = require('@lezer/highlight');

const get = require('./get-sig.js');
const getScopeType = require('./get-scope-type.js');
const getVarType = require('./get-var-type.js');

// waveql syntax
// https://codemirror.net/docs/ref/#language.StreamLanguage


// https://github.com/lezer-parser/highlight/blob/main/src/highlight.ts

const sidebarHighlightStyleGen = t => [

  // $var
  {tag: [t.variableName],   background: '#000', color: 'hsl(50,  100%, 25%)'},
  {tag: [t.macroName],      background: '#000', color: 'hsl(200, 100%, 30%)'},
  {tag: [t.bool],           background: '#000', color: 'hsl(60,  100%, 70%)'},
  {tag: [t.atom],           background: '#000', color: 'hsl(30,  100%, 70%)'},

  // $scope
  {tag: [t.namespace],      background: '#000', color: 'hsl(302, 100%, 25%)', fontStyle: 'italic'},
  {tag: [t.meta],           background: '#000', color: 'hsl(120, 100%, 80%)', fontStyle: 'italic'},
  {tag: [t.className],      background: '#000', color: 'hsl(322, 100%, 36%)', fontStyle: 'italic'},

  {tag: [t.punctuation],    background: '#000'},
  {tag: [t.labelName],      background: '#000', color: 'hsl(175, 100%, 86%)', fontWeight: 'bold'},
  {tag: [t.attributeName],  background: '#000', color: 'hsl(202, 100%, 66%)', fontWeight: 'bold'},
  {tag: [t.brace],          background: '#000', color: 'hsl(278, 100%, 79%)', fontWeight: 'bold'},
  {tag: [t.unit],           background: '#000', color: 'hsl(333, 100%, 80%)'},
  {tag: [t.comment],        background: '#000', color: 'hsl(0, 0%, 50%)'}
];

// textDecoration: 'underline',
// textUnderlinePosition: 'under'
// textDecoration: 'line-through'

const waveQlLang = wires => ({
  startState: function() {
    return {path: []};
  },
  token: function (stream, stt) {
    let mat;

    if (stream.eatSpace()) { return null; }

    mat = stream.match(/^\/\//); if (mat) { stream.skipToEnd(); return 'comment'; }

    mat = stream.match(/^@\d+[munpf]*s(\.\w+)*(\s+|$)/); if (mat) { return 'unit'; }

    mat = stream.match(/^\.\.\.(\s+|$)/); if (mat) { stt.path.pop(); stt.path.pop(); return 'punctuation'; }
    mat = stream.match(/^\.\.(\s+|$)/);   if (mat) { stt.path.pop(); return 'punctuation'; }
    mat = stream.match(/^\.(\s+|$)/);     if (mat) { return 'punctuation'; }
    mat = stream.match(/^\/(\s+|$)/);     if (mat) { stt.path.length = 0; return 'punctuation'; }

    mat = stream.match(/^:(\S+)(\s+|$)/); if (mat) { return 'labelName'; }

    mat = stream.match(/^\{[^}]+\}(\s+|$)/); if (mat) { return 'brace'; }

    mat = stream.match(/^%([<>^])?([+-])?([su])?([bodhHac])(\s+|$)/); if (mat) { return 'attributeName'; }

    mat = stream.match(/\(\w+(\s+|$)/); if (mat) { return 'macro'; }

    mat = stream.match(/^(\S+)(\s+|$)/); if (mat) {
      const sigName = mat[1];
      const newPath = stt.path.concat(sigName);
      const ero = get(wires, newPath, false);
      // console.log(newPath, ero);
      if (ero) {
        if (ero.kind === 'scope') {
          stt.path = newPath;
          return (getScopeType(ero.type)).tag;
        }
        if (ero.kind === 'var') {
          // stt.varWidth = ero.size;
          return (getVarType(ero.type)).tag;
        }
      }
      return 'comment';
    }
  },
  languageData: {
    commentTokens: {line: '//'}
  }
});


const extWaveqlLangWith = (wires) => {
  // console.log(wires);
  return [
    StreamLanguage.define(waveQlLang(wires)),
    syntaxHighlighting(HighlightStyle.define(sidebarHighlightStyleGen(tags)))
  ];
};

module.exports = extWaveqlLangWith;
