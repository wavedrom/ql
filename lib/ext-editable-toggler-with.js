'use strict';

const {Compartment} = require('@codemirror/state');
const {keymap, EditorView} = require('@codemirror/view');

// https://codemirror.net/docs/ref/#view.EditorView^editable
// https://codemirror.net/examples/config/#dynamic-configuration

const ediatableFlag = new Compartment;

const toggleEditability = (eView) => {
  console.log('toggleEditability');
  const e = EditorView.editable;
  eView.dispatch({
    effects: [
      ediatableFlag.reconfigure(EditorView.editable.of(!e))
    ]
  });
};

const extEdiatableTogglerWith = (key, isEdiatble) => [
  ediatableFlag.of(EditorView.editable.of(isEdiatble)),
  keymap.of([{key, run: toggleEditability, preventDefault: true}])
];

module.exports = extEdiatableTogglerWith;
