'use strict';

const hljs = require("highlight.js/lib/core");
hljs.debugMode(); // tests run in debug mode so errors are raised

// Tests for auto detection for Magik via `highlightAuto`.
require('./detect');

// HTML markup tests for Magik.
require('./markup');
