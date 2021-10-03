'use strict';

const chai = require('chai');
const lib = require('../lib/index.js');

const expect = chai.expect;

const examplo = {
  'foo bar': {
    src: `
foo
  bar
 baz
`,
    res: [
      'foo',
      'bar',
      'baz'
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
