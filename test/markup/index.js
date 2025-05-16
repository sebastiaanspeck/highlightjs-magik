'use strict';

//require('chai').should();

const fs = require('fs').promises;
const glob = require('glob');
const hljs = require("highlight.js/lib/core");
const magik = require("../../src/languages/magik");
const path = require('path');
const utility = require('../utility');

const languageName = "magik";

hljs.debugMode();
hljs.registerLanguage(languageName, magik);

describe("highlight " + languageName, () => {
  const filePath = utility.buildPath('markup', languageName, '*.expect.txt');
  const filenames = glob.sync(filePath, {windowsPathsNoEscape: true});

  filenames.forEach(function(filename) {
    const testName = path.basename(filename, '.expect.txt');
    const sourceName = filename.replace(/\.expect/, '');

    it(`should markup ${testName}`, function(done) {
      const sourceFile = fs.readFile(sourceName, 'utf-8');
      const expectedFile = fs.readFile(filename, 'utf-8');

      Promise.all([sourceFile, expectedFile]).then(function([source, expected]) {
        const actual = hljs.highlight(source, { language: languageName }).value;

        if (process.env.FIX_FAILING) {
          require('fs').writeFileSync(filename, actual);
        }

        actual.trim().should.equal(expected.trim());
        done();
      }).catch(function(err) { return done(err) });
    });
  });
});
