'use strict';

const mountCodeMirror6 = require('./mount-codemirror6.js');

const getElement = divName => {
  if (typeof divName === 'string') {
    const c = document.getElementById(divName);
    if (c === null) {
      throw new Error('<div> element width Id: "' + divName + '" not found');
    }
    return c;
  }
  return divName;
};

const initText = `\
tb
top

`
/* top .. top // comment
clock :clock
reset
@100ns
valid ready &

data %sH
addr
valid :valid
ready :ready
{clock,valid,ready,up:4}

very long line very long line very long line very long line very long line

addr %ud
addr
addr
addr
addr
`;
*/

// TODO

// Migration
// https://codemirror.net/docs/migration/

global.MAIN = async (div) => {
  const root = getElement(div);
  // const p = parserWithMetadata();
  // console.log(p);

  const deso = {
    waveql: initText,
    wires: {body: [
      {kind: 'scope', type: 'module', name: 'tb', body: [
        {kind: 'var', type: 'wire', name: 'reset'},
        {kind: 'var', type: 'reg',  name: 'clock'},
        {kind: 'scope', type: 'module', name: 'top', body: [
          {kind: 'var', type: 'wire', name: 'data'}
        ]}
      ]}
    ]}
  };
  const pstate = {};
  const render = () => {};

  mountCodeMirror6(root, deso, pstate, render);

};

/* eslint-env browser */
