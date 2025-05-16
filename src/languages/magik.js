/*
 Language: magik
 Description: Magik is an object-oriented programming language that supports multiple inheritance and polymorphism, and it is dynamically typed.
 Author: Sebastiaan Speck <sebastiaanspeck@github.com>
 Category: enterprise
*/

module.exports = function(hljs) {
  const LITERALS = [
    '_true',
    '_false',
    '_maybe',
    '_unset'
  ];

  const LANGUAGE_KEYWORDS = [
    '_self',
    '_super',
    '_clone',
  ];

  const OPERATORS = [
    '_and',
    '_or',
    '_xor',
    '_andif',
    '_orif',
  ];

  const VARIABLE_KEYWORDS = [
    '_global',
    '_local',
    '_constant',
    '_dynamic',
    '_import',
    '_optional',
    '_gather',
    '_scatter'
  ];

  const METHOD_KEYWORDS = [
    '_abstract',
    '_private',
    '_iter',
    '_method',
    '_endmethod'
  ];

  const LOOP_KEYWORDS = [
    '_loop',
    '_for',
    '_over',
    '_while',
    '_finally',
    '_endloop'
  ];

  const IF_KEYWORDS = [
    '_if',
    '_then',
    '_elif',
    '_else',
    '_endif'
  ]

  const RETURN_OPERATOR = {
    scope: 'keyword',
    begin: />>/
  };

  const KEYWORDS = {
    keyword: [
 ...OPERATORS,
'_return'
],
    type: [
 '_package',
'_proc',
'_endproc',
...VARIABLE_KEYWORDS,
...METHOD_KEYWORDS,
...LOOP_KEYWORDS,
...IF_KEYWORDS
],
    literal: LITERALS,
    built_in: LANGUAGE_KEYWORDS,
  };

  const SYMBOL = {
    scope: 'symbol',
    begin: /:(\|[^|]*\||[\w?!_])+/
  };

  const GLOBAL_VARIABLE = {
    scope: 'variable',
    begin: /[a-zA-Z_][a-zA-Z0-9_]*:[a-zA-Z_][a-zA-Z0-9_]*/
  };

  const GLOBAL_REFERENCE = {
    scope: 'variable',
    begin: /@(?:[a-zA-Z_][a-zA-Z0-9_]*:)?[a-zA-Z_][a-zA-Z0-9_]*/
  };

  const COMMENT = {
    scope: 'comment',
    begin: '#',
    end: '$'
  };

  const DOCUMENTATION = {
    scope: 'doctag',
    begin: '##',
    end: '$'
  };

  const PRAGMA = {
    scope: 'property',
    begin: '_pragma',
    end: '$'
  };
  return {
    name: 'Magik',
    aliases: [ 'magik' ],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: [
      hljs.QUOTE_STRING_MODE, // For double-quoted strings
      hljs.APOS_STRING_MODE, // For single-quoted strings
      hljs.C_NUMBER_MODE,
      DOCUMENTATION,
      COMMENT,
      RETURN_OPERATOR,
      SYMBOL,
      PRAGMA,
      GLOBAL_VARIABLE,
      GLOBAL_REFERENCE
    ]
  };
};
