'use strict';

const {EditorView} = require('@codemirror/view');

const extChange = EditorView.updateListener.of((update) => {

  // on cm text change -> cm.getValue();
  if (update.docChanged) {
    console.log('docChanged', update, update.state.doc.toString().length);
  }

  // const {focusChanged, geometryChanged, heightChanged, selectionSet, viewportChanged} = update;
  // console.log({focusChanged, geometryChanged, heightChanged, selectionSet, viewportChanged});

  // update.view.requestMeasure({
  //   read(view) {
  //     console.log(
  //       // view.elementAtHeight(0),
  //       view.coordsAtPos(0),
  //       // view.documentPadding,
  //       view.documentTop,
  //       view.contentDOM.getBoundingClientRect().top,
  //       view.scrollDOM.getBoundingClientRect().top,
  //       // view
  //     );
  //   }
  // });

  // on cm scroll -> cm.getScrollInfo();
  // const tr = update.transactions.find(tr => tr.scrollIntoView);
  // if (tr) {
  //   console.log(tr);
  //   update.view.requestMeasure({
  //     read() {
  //       console.log(update.view.documentTop);
  //     }
  //   });
  // }

  // update.view.requestMeasure({
  //   read() {
  //     console.log(update.view.scrollDOM.getBoundingClientRect());
  //   }
  // });


  // } else
  // if (update.focusChanged) { console.log('focusChanged', update); } else
  // if (update.geometryChanged) { console.log('geometryChanged', update); } else
  // if (update.heightChanged) { console.log('heightChanged', update); } else
  // if (update.selectionSet) { console.log('selectionSet', update); } else
  // if (update.viewportChanged) { console.log('viewportChanged', update); }
});

module.exports = extChange;
