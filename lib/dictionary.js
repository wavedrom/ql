'use strict';

const get = require('./get-sig.js');
const tracePath = require('./trace-path.js');

const dict = [

  {m: '(DIZ', fn: (stream, stt, mat, wires) => {
    stream.eatSpace();
    const arg1 = stream.match(/^(\S+)(\s+|$)/);
    if (arg1) {
      let rex;
      try {
        rex = new RegExp(arg1[1]);
      } catch (err) {
        return 'comment';
      }
      const rowo = stt.rowo;
      const clock = stt.labelo.clock;
      if (clock === undefined) {
        return 'comment';
      }
      rowo.kind = 'DIZ';
      rowo.clock = stt.labelo.clock;

      const levelo = get(wires, stt.path, false);
      const othero0 = levelo.body.reduce((res, ero) => {
        const m = ero.name.match(rex);
        if (m && m.groups && m.groups.id) {
          const {id, pc, go} = m.groups;
          const stage = res[id] = (res[id] || {});
          const desc = {name: ero.name, ref: ero.link};
          if (pc) {
            stage[pc] = desc;
          } else
          if (go) {
            stage[go] = desc;
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
      rowo.othero = othero;
      stt.rStack.push(rowo);
      return 'macroName';
    }
    return 'comment';
  }},

  {m: '/', fn: (stream, stt) => {
    stt.path.length = 0;
    tracePath(stream, stt);
    return 'punctuation';
  }},

  {m: '.', fn: (/* stream, stt */) => {
    return 'punctuation';
  }},

  {m: '..', fn: (stream, stt) => {
    stt.path.pop();
    tracePath(stream, stt);
    return 'punctuation';
  }},

  {m: '...', fn: (stream, stt) => {
    stt.path.pop();
    stt.path.pop();
    tracePath(stream, stt);
    return 'punctuation';
  }},

  {m: '//', fn: (stream /*, stt */) => {
    stream.skipToEnd();
    return 'comment';
  }},

  {m: ')', fn: (stream, stt) => {
    const {rStack} = stt;
    const rTop = rStack.pop();
    if (rTop) {
      rTop.len = stt.rowo.idx - rTop.idx + 1;
      return 'macroName';
    }
    return 'comment';
  }},

  {m: /^@(?<value>\d+)(?<mult>[munpf]*s)(\.(?<style>\w+))?$/, fn: (stream, stt, mat) => {
    const scale = {
      's': 0,
      'ms': -3,
      'us': -6,
      'ns': -9,
      'ps': -12,
      'fs': -15
    };
    const rowo = stt.rowo;
    rowo.vlines = rowo.vlines || [];
    rowo.vlines.push({
      value: Number(mat.groups.value),
      mult: scale[mat.groups.mult],
      style: mat.groups.style
    });
    return 'unit';
  }},

  {m: /^%(?<align>[<>^])?(?<plus>[+-])?(?<sign>[su])?(?<radix>[bodhHac])$/, fn: (stream, stt, mat) => {
    stt.rowo.format = mat.groups;
    return 'attributeName';
  }},

  {m: /^:(?<name>\S+)(\s+|$)/, fn: (stream, stt, mat) => {
    stt.labelo[mat.groups.name] = stt.rowo;
    return 'labelName';
  }},

  {m: /^\{(?<body>[^}]+)\}$/, fn: (stream, stt, mat) => {
    const a = mat.groups.body;
    const b = a.split(',');
    const body = b.reduce((res, e) => {
      const ee = e.split(':');
      const [key, val] = ee;
      if (ee.length === 2) {
        const sig = stt.labelo[val] || Number(val);
        res[key] = sig;
      } else
      if (ee.length === 1) {
        res[key] = stt.labelo[key] || {};
      }
      return res;
    }, {});
    stt.rowo.kind = 'brace';
    stt.rowo.body = body;
    return 'brace';
  }}

];

module.exports = dict;
