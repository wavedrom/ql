'use strict';

const getVarType = (key) => {
  const lut = {
    // event:      {id: 1,   tag: 'variableName'},
    // integer:    {id: 2,   tag: 'variableName'},
    parameter:  {id: 3,   tag: 'macroName', icon: 'parameter'},
    // real:       {id: 4,   tag: 'variableName'},
    // realtime:   {id: 5,   tag: 'variableName'},
    reg:        {id: 6,   tag: 'atom', icon: 'reg', term: 'varReg'},
    // supply0:    {id: 7,   tag: 'variableName'},
    // supply1:    {id: 8,   tag: 'variableName'},
    // time:       {id: 9,   tag: 'variableName'},
    // tri:        {id: 10,  tag: 'variableName'},
    // triand:     {id: 11,  tag: 'variableName'},
    // trior:      {id: 12,  tag: 'variableName'},
    // trireg:     {id: 13,  tag: 'variableName'},
    // tri0:       {id: 14,  tag: 'variableName'},
    // tri1:       {id: 15,  tag: 'variableName'},
    // wand:       {id: 16,  tag: 'variableName'},
    wire:       {id: 17,  tag: 'bool', icon: 'wire', term: 'varWire'}
    // wor:        {id: 18,  tag: 'variableName'}
  };
  return lut[key] || {tag: 'variableName', icon: 'other', term: 'varOther'};
};

module.exports = getVarType;
