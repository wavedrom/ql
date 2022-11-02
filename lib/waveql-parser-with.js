'use strict';

const get = require('lodash.get');

const diz = (cols, wires, path, rowIdx) => {
  if (cols[0] !== 'DIZ') {
    return;
  }

  const levelo = get(wires, path, false);
  const arg1 = cols[1]; // pipeline stages

  // find all potential candidates
  const othero0 = Object.keys(levelo).reduce((res, name) => {
    const m = name.match(arg1);
    if (m) {
      const {id, pc, go} = m.groups;
      const stage = res[id] = (res[id] || {});
      const desc = {name, ref: levelo[name]};
      if (pc) {
        stage[pc] = desc;
      } else
      if (go) {
        stage[go] = desc;
      } else {
        console.log(desc);
      }
    }
    return res;
  }, {});

  // filter out singles
  const othero = Object.keys(othero0).reduce((res, name) => {
    const val = othero0[name];
    if (val.pc && val.go) {
      res[name] = val;
    }
    return res;
  }, {});

  return {kind: 'DIZ', idx: rowIdx, othero, clock: {name: 'clock', ref: levelo.clock}};
};

const waveqlParserWith = wires => str => {
  const arr = str.split('\n');
  const path = [];
  const labelo = {};
  let nRow;
  let mat;

  const res = arr.map((row, rowIdx) => {
    row = row.trim();

    // Section with Parentheses

    if (row[0] === '(') {
      const cols = row.slice(1).split(/\s+/);
      const res = diz(cols, wires, path, rowIdx); // || other commands
      if (res) {
        nRow = res;
        return res;
      }
    }

    if (row[0] === ')') {
      if (nRow !== undefined) {
        nRow.len = rowIdx - nRow.idx + 1;
        nRow = undefined;
      }
      return {};
    }

    const rowo = {};
    const cols = row.split(/\s+/);
    cols.map(col => {
      if (col === '...') { path.pop(); path.pop(); return; }
      if (col === '..')  { path.pop(); return; }
      if (col === '.')   { return; }
      if (col === '/')   { path.length = 0; return; }

      mat = col.match(/^:(\S+)$/); if (mat) {
        labelo[mat[1]] = rowo;
        return;
      }

      mat = col.match(/^(\{)([^}]+)(\})$/); if (mat) {
        const a = mat[2];
        const b = a.split(',');
        rowo.kind = 'brace';
        rowo.body = b.reduce((res, e) => {
          const ee = e.split(':');
          if (ee.length === 2) {
            const key = ee[0];
            const val = labelo[ee[1]] || Number(ee[1]);
            res[key] = val;
          } else
          if (ee.length === 1) {
            res[ee[0]] = labelo[ee[0]] || {};
          } else {
            console.error(ee);
          }
          return res;
        }, {});
        return;
      }

      mat = col.match(/^%([<>^])?([+-])?([su])?([bodhHac])$/); if (mat) {
        rowo.format = {
          align: mat[1],
          plus:  mat[2],
          sign:  mat[3],
          radix: mat[4]
        };
        return;
      }

      const newPath = path.concat(col);
      const ref = get(wires, newPath, false);

      if (typeof ref === 'string') {
        rowo.name = col;
        rowo.ref = ref;
      } else
      if (typeof ref === 'object') {
        path.push(col);
      }
    });
    return rowo;
  });
  return res;
};

module.exports = waveqlParserWith;
