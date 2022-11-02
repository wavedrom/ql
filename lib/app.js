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
top .. top
clock :clock
reset

(DIZ

)

data %d
addr
valid :valid
ready :ready
{clock,valid,ready,up:4}

very long line very long line very long line very long line very long line

addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
addr
`;


// TODO



// Migration
// https://codemirror.net/docs/migration/


global.MAIN = async (div) => {
  const root = getElement(div);
  // console.log(cmLanguage);

  const deso = {
    waveql: initText,
    wires: {}
  };
  const pstate = {};
  const render = () => {};

  mountCodeMirror6(root, deso, pstate, render);

};

/* eslint-env browser */
