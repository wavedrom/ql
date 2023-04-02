'use strict';

const {LanguageSupport, LRLanguage, syntaxHighlighting, HighlightStyle} = require('@codemirror/language');
const {styleTags, tags} = require('@lezer/highlight');
const { ContextTracker } = require('@lezer/lr');

const {parser} = require('./parser.js');

const sidebarHighlightStyleGen = t => [

  // $var
  {tag: [t.variableName],   background: '#000', color: 'hsl(50,  100%, 25%)'},
  // {tag: [t.macroName],      background: '#000', color: 'hsl(200, 100%, 30%)'},
  {tag: [t.bool],           background: '#000', color: 'hsl(60,  100%, 70%)'},
  {tag: [t.atom],           background: '#000', color: 'hsl(30,  100%, 70%)'},

  // $scope
  {tag: [t.namespace],      background: '#000', color: 'hsl(302, 100%, 25%)', fontStyle: 'italic'},
  {tag: [t.meta],           background: '#000', color: 'hsl(120, 100%, 80%)', fontStyle: 'italic'},
  // {tag: [t.className],      background: '#000', color: 'hsl(322, 100%, 36%)', fontStyle: 'italic'},

  {tag: [t.punctuation],    background: '#000'},
  // {tag: [t.labelName],      background: '#000', color: 'hsl(175, 100%, 86%)', fontWeight: 'bold'},
  // {tag: [t.attributeName],  background: '#000', color: 'hsl(202, 100%, 66%)', fontWeight: 'bold'},
  // {tag: [t.brace],          background: '#000', color: 'hsl(278, 100%, 79%)', fontWeight: 'bold'},
  {tag: [t.unit],           background: '#000', color: 'hsl(333, 100%, 80%)'},
  {tag: [t.comment],        background: '#000', color: 'hsl(0, 0%, 50%)'}
];

const parserWithMetadata = (wires) => {
  return parser.configure({
    props: [
      styleTags({
        varOther: tags.variableName,
        varWire: tags.bool,
        varReg: tags.atom,

        scopeOther: tags.namespace,
        scopeModule: tags.meta,
        // Label: tags.labelName,
        TimeStamp: tags.unit,
        // Format: tags.attributeName,
        hierChange: tags.punctuation,
        // Brace: tags.brace,
        // '( )': tags.paren,
        LineComment: tags.lineComment
      })
    ],
    contextTracker: new ContextTracker({
      start: {wires, path: []},
      strict: false
    })
  });
};

const waveQlLanguage = (wires) => LRLanguage.define({
  name: 'waveql',
  parser: parserWithMetadata(wires),
  languageData: {
    commentTokens: {line: '//'}
  }
});

const extWaveqlLangLezerWith = (wires) => {
  // console.log(wires);
  return [
    new LanguageSupport(waveQlLanguage(wires)),
    syntaxHighlighting(HighlightStyle.define(sidebarHighlightStyleGen(tags)))
  ];
};

module.exports = extWaveqlLangLezerWith;
