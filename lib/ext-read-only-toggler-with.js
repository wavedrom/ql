'use strict';

const {EditorState, Compartment} = require('@codemirror/state');
const {keymap, EditorView} = require('@codemirror/view');

// https://codemirror.net/docs/ref/#state.EditorState.readOnly
// https://codemirror.net/examples/config/#dynamic-configuration

const roFlag = new Compartment;
const roStyle = new Compartment;

const rw = EditorView.contentAttributes.of({
  style: 'caret-color: #11ffbb'
});

const ro = EditorView.contentAttributes.of({
  style: 'caret-color: #ff5500'
});

const toggleEditability = (eView) => {
  const r = eView.state.readOnly;
  eView.dispatch({
    effects: [
      roFlag.reconfigure(EditorState.readOnly.of(!r)),
      roStyle.reconfigure(r ? rw : ro)
    ]
  });
};

const extReadOnlyTogglerWith = (key, initialValue) => [
  roFlag.of(EditorState.readOnly.of(initialValue)),
  roStyle.of(ro),
  keymap.of([{key, run: toggleEditability, preventDefault: true}])
];

module.exports = extReadOnlyTogglerWith;
