'use strict';

const {expect} = require('chai');
const lib = require('../lib/index.js');

describe('basic', () => {
  it('exist', async () => {
    expect(lib.langParser).to.be.a('function');
    expect(lib.waveQlLang).to.be.a('function');
    expect(lib.mountCodeMirror6).to.be.a('function');
  });
});

/* eslint-env mocha */
