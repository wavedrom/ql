'use strict';

const defineStream = (string, rowOffset) => {
  const stream = {string, rowOffset, pos: 0};

  stream.match = (regx, consume) => {
    const sub = stream.string.slice(stream.pos);
    const m = sub.match(regx);
    if (m && ((consume === undefined) || (consume === true))) {
      stream.pos += m[0].length;
    }
    return m;
  };

  stream.skipToEnd = () => {
    stream.pos = stream.string.length;
  };

  stream.eatSpace = () => {
    const sub = stream.string.slice(stream.pos);
    const m = sub.match(/^\s+/);
    if (m) {
      stream.pos += m[0].length;
      return true;
    }
  };

  return stream;
};

const langParser = (lang) => {
  const stt = lang.startState();
  return (string) => {
    // stream.string = string;
    let rowOffset = 0;
    const rows = string.split(/\n/);
    for (const row of rows) {
      if (row === '') {
        lang.blankLine(stt);
      } else {
        const stream = defineStream(row, rowOffset);
        while (stream.pos < stream.string.length) {
          lang.token(stream, stt);
        }
        rowOffset += row.length;
      }
      rowOffset += 1;
    }
    return stt;
  };
};

module.exports = langParser;
