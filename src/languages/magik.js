/*
Language: Magik
Description: Magik is an object-oriented programming language that supports multiple inheritance and polymorphism, and it is dynamically typed.
Author: Sebastiaan Speck <sebastiaanspeck@github.com>
Category: enterprise // FIXME: Is this the correct category?
*/

module.exports = function(hljs) {
  const LITERALS = [
    '_true',
    '_false',
    '_maybe',
    '_unset'
  ];

  const VARIABLES = [
    '_dynamic',
    '_global',
    '_import',
    '_local',
    '_constant',
    '_class',
  ]

  const ARGUMENTS = [
    '_gather',
    '_scatter',
    '_allresults',
    '_optional'
  ];

  const METHOD = [
    '_abstract',
    '_private',
    '_iter',
    '_method',
    '_endmethod',
    '_primitive',
  ];

  const PROCEDURE = [
    '_proc',
    '_endproc'
  ]

  const BLOCK = [
    '_block',
    '_endblock'
  ]

  const IF = [
    '_if',
    '_then',
    '_elif',
    '_else',
    '_endif'
  ]

  const LOOP = [
    '_loop',
    '_for',
    '_over',
    '_while',
    '_finally',
    '_loopbody',
    '_leave',
    '_continue',
    '_endloop'
  ];

  const HANDLING = [
    '_handling',
    '_default'
  ]

  const CATCH = [
    '_catch',
    '_endcatch'
  ]

  const TRY = [
    '_try',
    '_when',
    '_endtry'
  ]

  const PROTECT = [
    '_protect',
    '_locking',
    '_protection',
    '_endprotect',
  ]

  const LOCK = [
    '_lock',
    '_endlock'
  ]

  const RELATIONAL_OPERATOR = [
    '_is',
    '_isnt',
    '_cf',
    '=',
    '~=',
    '<>',
    '>=',
    '<=',
    '<',
    '>'
  ]

  const LOGICAL_OPERATOR = [
    '_and',
    '_or',
    '_xor',
    '_andif',
    '_orif',
  ];

  const ARITHMETIC_OPERATOR = [
    '**',
    '*',
    '/',
    '_mod',
    '_div',
  ]

  const UNARY_OPERATOR = [
    '_not',
    '_~'
  ]

  const KEYWORDS = {
    keyword: [
      ...VARIABLES,
      ...ARGUMENTS,
      ...METHOD,
      ...PROCEDURE,
      ...BLOCK,
      ...IF,
      ...LOOP,
      ...HANDLING,
      ...CATCH,
      ...TRY,
      ...PROTECT,
      ...LOCK,
      '_return',
      '_throw',
      '_with',
    ],
    literal: LITERALS,
    operator: [
      ...RELATIONAL_OPERATOR,
      ...LOGICAL_OPERATOR,
      ...ARITHMETIC_OPERATOR,
      ...UNARY_OPERATOR
    ],
    punctuation: [
      '(', ')', '[', ']', ',', ';'
    ],
    built_in: [ '_package' ],
    'variable.language': [
      '_self',
      '_super',
      '_clone'
    ],
    'title.function.invoke': [ 'def_slotted_exemplar' ],
    meta: ARGUMENTS,
  };

  const CLASS = {
    match: [
      /\b_class/,
      /\s+/,
      /\|[a-zA-Z0-9._]+\|/
    ],
    scope: {
      1: 'keyword',
      3: 'title.class'
    }
  };

  const LABEL = {
    scope: 'meta',
    begin: /@\s?(\|[A-Za-z0-9_?.!]*\||[A-Za-z0-9_?!]+)+/
  };

  const NUMBER = {
    scope: 'number',
    variants: [
      { begin: '\\b\\d+(\\.\\d+)?([eE&][+-]?\\d+)?\\b'}, // Decimal and floats with optional exponent
      { begin: '\\b(?:[2-9]|[1-2]\\d|3[0-6])[rR][a-zA-Z0-9]+\\b' } // Radix notation (e.g., 16r1F)
    ],
    relevance: 0
  };

  const METHOD_DECLARATION = {
    match: [
      /(?:_abstract\s+)?/,
      /(?:_private\s+)?/,
      /(?:_iter\s+)?/,
      /_method/,
      /\s+/,
      /[a-zA-Z_][a-zA-Z0-9_]*/,
      /(?:\.[a-zA-Z_][a-zA-Z0-9_]*)?/
    ],
    scope: {
      4: 'keyword',
      6: 'title.class',
      7: 'title.function'
    }
  };

  const DYNAMIC_VARIABLE = {
    scope: 'variable',
    variants: [
      { begin: /![A-Za-z][A-Za-z0-9_?!]*!/ },
      { begin: /\|![A-Za-z0-9_?!]+!\|/ },
      { begin: /\|![A-Za-z0-9_?!]+\|!/ },
      { begin: /!\|[A-Za-z0-9_?!]+\|!/ },
      { begin: /(\|[A-Za-z]?[A-Za-z0-9_?!]*\||[A-Za-z][A-Za-z0-9_?!]*):![A-Za-z][A-Za-z0-9_?!]*!/ },
    ]
  };

  const GLOBAL_VARIABLE = {
    scope: 'variable',
    begin: /[a-zA-Z_][a-zA-Z0-9_]*:[a-zA-Z_][a-zA-Z0-9_]*/
  };

  const GLOBAL_REFERENCE = {
    scope: 'variable',
    begin: /@(?:[a-zA-Z_][a-zA-Z0-9_]*:)?[a-zA-Z_][a-zA-Z0-9_]*/
  };

  const PRAGMA = {
    scope: 'property',
    begin: '_pragma',
    end: '$'
  };

  const ASSIGNMENT = {
    scope: 'operator',
    begin: /<<|\^<<|_and<<|_andif<<|_or<<|_orif<<|_xor<<|\*\*<<|\*\*\^<<|\*<<|\*?\^<<|\/<<|\/\^<<|_mod<<|_div<<|-\^?<<|\+<<|\+\^<</
  };

  const RETURN = {
    scope: 'operator',
    begin: />>/
  };

  const SYMBOL = {
    scope: 'symbol',
    begin: /:(\|[^|]*\||[\w?!_])+/
  };

  const DOCUMENTATION = {
    scope: 'doctag',
    begin: '##',
    end: '$'
  };

  const COMMENT = {
    scope: 'comment',
    begin: '#',
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
      DOCUMENTATION,
      COMMENT,
      SYMBOL,
      PRAGMA,
      ASSIGNMENT,
      RETURN,
      NUMBER,
      LABEL,
      CLASS,
      DYNAMIC_VARIABLE,
      GLOBAL_VARIABLE,
      GLOBAL_REFERENCE,
      METHOD_DECLARATION
    ]
  };
};
