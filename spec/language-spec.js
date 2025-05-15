/**
 * Unit test for highlight grammar:
 * - verifies language is loaded via highlightjs core
 * - verifies expected version
 * - verifies expected highlight grammar
 */
const hljs = require("highlight.js/lib/core");
const magik = require("../src/languages/magik");
const fs = require("fs");
const path = require("path");

const languageName = "magik";
const testSourcePath = path.resolve(__dirname, "../test/markup/", languageName);

hljs.registerLanguage(languageName, magik);

describe("highlight " + languageName, () => {
  it("defines " + languageName, () => {
    // highlight has Magik defined
    const hljsMagik = hljs.getLanguage(languageName);
    expect(hljsMagik).not.toBe(null);
  });

  const testFiles = fs.readdirSync(testSourcePath)
    .filter(file => file.endsWith(".txt") && !file.endsWith(".expect.txt"))
    .map(file => path.basename(file, ".txt"));

  testFiles.forEach((file) => {
    it(`highlights file '${file}.txt' correctly`, () => {
      const testFileSourcePath = path.join(testSourcePath, file + ".txt");
      const testFileExpectedPath = path.join(testSourcePath, file + ".expect.txt");

      // Read the test input
      const sample = fs.readFileSync(
        path.resolve(__dirname, testFileSourcePath),
        "utf-8"
      );

      // Highlight the input
      const result = hljs.highlight(sample, { language: languageName, ignoreIllegals: true });
      expect(result.language).toBe(languageName);

      // Read the expected output
      const expected = fs.readFileSync(
        path.resolve(__dirname, testFileExpectedPath),
        "utf-8"
      );

      // Compare the highlighted output to expected
      expect(result.value).toBe(expected);
    });
  });
});