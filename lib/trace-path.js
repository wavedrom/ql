'use strict';

const tracePath = (stream, stt) => {
  if (stream.rowOffset != undefined) {
    const offset = stream.rowOffset + stream.pos;
    stt.pathTrace.push([offset, stt.path]);
  }
};

module.exports = tracePath;

