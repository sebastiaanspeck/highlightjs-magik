'use strict';

const fs = require('fs').promises;
const hljs = require("highlight.js/lib/core");
const magik = require("../../src/languages/magik");
const path = require('path');
const utility = require('../utility');

const languageName = "magik";

hljs.debugMode(); // tests run in debug mode so errors are raised
hljs.registerLanguage(languageName, magik);

describe('hljs.highlightAuto()', () => {
  const languagePath = utility.buildPath('detect', languageName);

  it(`should be detected as ${languageName}`, async() => {
    const dir = await fs.stat(languagePath);
    dir.isDirectory().should.be.true();

    const filenames = (await fs.readdir(languagePath));
    await Promise.all(filenames
      .map(async function(example) {
        const filename = path.join(languagePath, example);

        const content = await fs.readFile(filename, 'utf-8');
        const detectedLanguage = hljs.highlightAuto(content).language;

        detectedLanguage.should.equal(languageName,
          `${path.basename(filename)} should be detected as ${languageName}, but was ${detectedLanguage}`);
      }));
  });
});
