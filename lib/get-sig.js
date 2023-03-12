'use strict';

const get = (wires, pat) => {
  for (let i = 0; i < pat.length; i++) {
    const ero = wires.body.find(e => e.name === pat[i]);
    if (ero === undefined) {
      return false;
    }
    wires = ero;
  }
  return wires;
};

module.exports = get;
