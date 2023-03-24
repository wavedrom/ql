'use strict';

const {ExternalTokenizer}  = require('@lezer/lr');
const terms = require('./parser.terms.js');

const get = require('./get-sig.js');
const getScopeType = require('./get-scope-type.js');
const getVarType = require('./get-var-type.js');

// exports.trackScope = new ContextTracker({
//   start: {path: [0]},
//   // shift: (context, term) => {
//   //   // console.log('$shift', term);
//   // },
//   strict: false
// });

exports.Identifier = new ExternalTokenizer((input, stack) => {
  const context = stack.curContext.context;
  const {wires, path} = context;
  const m = input.chunk.slice(input.chunkOff).match(/^([:.{,}&%\w]+)(\s|$)/);
  if (m) {
    const word = m[1];
    const newPath = path.concat(word);
    const ero = get(wires, newPath, false);
    if (ero) {
      if (ero.kind === 'scope') {
        const term = terms[(getScopeType(ero.type)).term];
        console.log(JSON.stringify([newPath, term, ero], null, 1));
        input.acceptToken(term, word.length);
        context.path = newPath;
        return;
      }
      if (ero.kind === 'var') {
        // stt.varWidth = ero.size;
        input.acceptToken(terms[(getVarType(ero.type)).term], word.length);
        return;
      }
    }

    if (word === '..') {
      context.path = path.slice(0, -1);
      input.acceptToken(terms.hierChange, word.length);
      return; //  (getVarType(ero.type)).tag;
    }

    input.acceptToken(terms.LineComment, word.length);
    // return 'comment';


    // stack.context.path = [stack.context.path[0] + 1];
    // console.log(input, stack, wires, word);
    // input.acceptToken(Identifier, word.length);
  }
  // throw new Error();
}, {contextual: true, fallback: true});
