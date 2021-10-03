'use strict';

const chai = require('chai');
const lib = require('../lib/index.js');

const expect = chai.expect;

const examplo = {
  'foo bar baz ...': {
    src: `

foo
  ./bar
  ./bar/baz

  dir/
./_fuz42
 ../../bam
`,
    res: [
      {kind: 'empty',  path: []},
      {kind: 'empty',  path: []},
      {kind: 'signal', path: [],              id: 'foo'},
      {kind: 'signal', path: [],              id: 'bar'},
      {kind: 'signal', path: ['bar'],         id: 'baz'},
      {kind: 'empty',  path: ['bar']},
      {kind: 'empty',  path: ['bar', 'dir']},
      {kind: 'signal', path: ['bar', 'dir'],  id: '_fuz42'},
      {kind: 'signal', path: [],              id: 'bam'},
      {kind: 'empty',  path: []}
    ]
  }
};

describe('parse', () =>
  Object.keys(examplo).map(exampleKey =>{
    it(exampleKey, async () => {
      const example = examplo[exampleKey];
      const src = example.src;
      expect(src).to.be.a('string');
      const res = lib.parse(src);
      expect(res).to.be.an('array');
      expect(res).to.deep.eq(example.res);
    });
  }));

/* eslint-env mocha */
