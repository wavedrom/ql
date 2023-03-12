'use strict';

const {StreamLanguage, syntaxHighlighting, HighlightStyle} = require('@codemirror/language');
const {tags} = require('@lezer/highlight');

const get = require('./get-sig.js');

// waveql syntax
// https://codemirror.net/docs/ref/#language.StreamLanguage

const varTypes = {
  // event:      {id: 1,   tag: 'variableName'},
  // integer:    {id: 2,   tag: 'variableName'},
  parameter:  {id: 3,   tag: 'macroName'},
  // real:       {id: 4,   tag: 'variableName'},
  // realtime:   {id: 5,   tag: 'variableName'},
  reg:        {id: 6,   tag: 'atom'},
  // supply0:    {id: 7,   tag: 'variableName'},
  // supply1:    {id: 8,   tag: 'variableName'},
  // time:       {id: 9,   tag: 'variableName'},
  // tri:        {id: 10,  tag: 'variableName'},
  // triand:     {id: 11,  tag: 'variableName'},
  // trior:      {id: 12,  tag: 'variableName'},
  // trireg:     {id: 13,  tag: 'variableName'},
  // tri0:       {id: 14,  tag: 'variableName'},
  // tri1:       {id: 15,  tag: 'variableName'},
  // wand:       {id: 16,  tag: 'variableName'},
  wire:       {id: 17,  tag: 'bool'}
  // wor:        {id: 18,  tag: 'variableName'}
};

const scopeTypes = {
  module:     {id: 0,   tag: 'meta'},
  // task:       {id: 1,   tag: 'namespace'},
  // function:   {id: 2,   tag: 'namespace'},
  // begin:      {id: 3,   tag: 'namespace'},
  // fork:       {id: 4,   tag: 'namespace'},
  // extra scopes from Verilator
  // generate:   {id: 5,   tag: 'namespace'},
  // struct:     {id: 6,   tag: 'namespace'},
  // union:      {id: 7,   tag: 'namespace'},
  class:      {id: 8,   tag: 'className'}
  // interface:  {id: 9,   tag: 'namespace'},
  // package:    {id: 10,  tag: 'namespace'},
  // program:    {id: 11,  tag: 'namespace'}
};


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

    mat = stream.match(/^#/); if (mat) { stream.skipToEnd(); return 'comment'; }

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
          return (scopeTypes[ero.type] || {tag: 'namespace'}).tag;
        }
        if (ero.kind === 'var') {
          // stt.varWidth = ero.size;
          return (varTypes[ero.type] || {tag: 'variableName'}).tag;
        }
      }
      return 'comment';
    }
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
