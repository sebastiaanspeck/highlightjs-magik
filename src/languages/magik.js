/*
Language: Magik
Description: Magik is an object-oriented programming language that supports multiple inheritance and polymorphism, and it is dynamically typed.
Author: Sebastiaan Speck <sebastiaanspeck@github.com>
Category: enterprise // FIXME: Is this the correct category?
*/

module.exports = function(hljs) {
  const VARIABLES = [
    '_dynamic',
    '_global',
    '_import',
    '_local',
    '_constant',
    '_class',
  ]

  const METHOD = [
    '_abstract',
    '_private',
    '_iter',
    '_method',
    '_endmethod'
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

  const THROW = [ '_throw' ]

  const PRIMITIVE = [ '_primitive' ]

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

  const KLEENEAN = [
    '_true',
    '_false',
    '_maybe',
  ];

  const UNSET = [ '_unset' ]

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

  const PUNCTUATION = [
    '(',
    ')',
    '[',
    ']',
    ',',
    ';'
  ]

  const BUILT_INS = [
    '_package',
    '_thisthread'
  ]

  const SPECIAL_KEYWORDS = [
    '_self',
    '_super',
    '_clone'
  ]

  const ARGUMENTS = [
    '_gather',
    '_scatter',
    '_allresults',
    '_optional'
  ];


  const KEYWORDS = {
    keyword: [
      ...VARIABLES,
      ...METHOD,
      ...PROCEDURE,
      ...BLOCK,
      ...IF,
      ...LOOP,
      ...HANDLING,
      ...CATCH,
      ...THROW,
      ...PRIMITIVE,
      ...TRY,
      ...PROTECT,
      ...LOCK,
      '_with', // standalone since _finally, _handling, _throw, _try, _leave and _continue all can have this
    ],
    literal: [
      ...KLEENEAN,
      ...UNSET
    ],
    operator: [
      ...RELATIONAL_OPERATOR,
      ...LOGICAL_OPERATOR,
      ...ARITHMETIC_OPERATOR,
      ...UNARY_OPERATOR
    ],
    punctuation: PUNCTUATION,
    built_in: BUILT_INS,
    'variable.language': SPECIAL_KEYWORDS,
    'title.function.invoke': [ 'def_slotted_exemplar' ],
    meta: ARGUMENTS,
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

  const SYMBOL = {
    scope: 'symbol',
    begin: /:(\|[^|]*\||[\w?!_])+/
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
    variants: [
      { begin: />>/ },
      { begin: '_return' }
    ]
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
      LABEL,
      NUMBER,
      CLASS,
      DYNAMIC_VARIABLE,
      GLOBAL_VARIABLE,
      GLOBAL_REFERENCE,
      METHOD_DECLARATION
    ]
  };
};
