'use strict';

const {EditorState, Compartment} = require('@codemirror/state');
const {keymap, EditorView} = require('@codemirror/view');

// https://codemirror.net/docs/ref/#state.EditorState.readOnly
// https://codemirror.net/docs/ref/#view.EditorView^editable
// https://codemirror.net/examples/config/#dynamic-configuration

const roFlag = new Compartment;
const roStyle = new Compartment;

// https://codemirror.net/examples/styling/
const rw = EditorView.contentAttributes.of({style: 'caret-color: #1177ff'});
const ro = EditorView.contentAttributes.of({style: 'caret-color: #ff7711'});

const toggleEditability = (eView) => {
  const r = eView.state.readOnly;
  eView.dispatch({
    effects: [
      roFlag.reconfigure(EditorState.readOnly.of(!r)),
      roStyle.reconfigure(r ? rw : ro)
    ]
  });
};

const extReadOnlyTogglerWith = (key) => [
  roFlag.of(EditorState.readOnly.of(true)),
  roStyle.of(ro),
  keymap.of([{key, run: toggleEditability, preventDefault: true}])
];

module.exports = extReadOnlyTogglerWith;
