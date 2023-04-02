'use strict';

const getScopeType = (key) => {
  const lut = {
    module:     {id: 0,   tag: 'meta', icon: 'module', term: 'scopeModule'}
    // task:       {id: 1,   tag: 'namespace'},
    // function:   {id: 2,   tag: 'namespace'},
    // begin:      {id: 3,   tag: 'namespace'},
    // fork:       {id: 4,   tag: 'namespace'},
    // extra scopes from Verilator
    // generate:   {id: 5,   tag: 'namespace'},
    // struct:     {id: 6,   tag: 'namespace'},
    // union:      {id: 7,   tag: 'namespace'},
    // class:      {id: 8,   tag: 'className', icon: 'class'}
    // interface:  {id: 9,   tag: 'namespace'},
    // package:    {id: 10,  tag: 'namespace'},
    // program:    {id: 11,  tag: 'namespace'}
  };
  return lut[key] || {tag: 'namespace', icon: 'other', term: 'scopeOther'};
};

module.exports = getScopeType;
