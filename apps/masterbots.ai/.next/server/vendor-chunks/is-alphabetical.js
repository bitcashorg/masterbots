"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-alphabetical";
exports.ids = ["vendor-chunks/is-alphabetical"];
exports.modules = {
  /***/ "(ssr)/../../node_modules/is-alphabetical/index.js":
    /*!***************************************************!*\
  !*** ../../node_modules/is-alphabetical/index.js ***!
  \***************************************************/
    /***/ (module) => {
      eval(
        "\n\nmodule.exports = alphabetical\n\n// Check if the given character code, or the character code at the first\n// character, is alphabetical.\nfunction alphabetical(character) {\n  var code = typeof character === 'string' ? character.charCodeAt(0) : character\n\n  return (\n    (code >= 97 && code <= 122) /* a-z */ ||\n    (code >= 65 && code <= 90) /* A-Z */\n  )\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzL2lzLWFscGhhYmV0aWNhbC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBWTs7QUFFWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvc2hlcmlmZi9EZXNrdG9wL2JpdGNhc2gtYXBwcy9tYXN0ZXJib3RzL25vZGVfbW9kdWxlcy9pcy1hbHBoYWJldGljYWwvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYWxwaGFiZXRpY2FsXG5cbi8vIENoZWNrIGlmIHRoZSBnaXZlbiBjaGFyYWN0ZXIgY29kZSwgb3IgdGhlIGNoYXJhY3RlciBjb2RlIGF0IHRoZSBmaXJzdFxuLy8gY2hhcmFjdGVyLCBpcyBhbHBoYWJldGljYWwuXG5mdW5jdGlvbiBhbHBoYWJldGljYWwoY2hhcmFjdGVyKSB7XG4gIHZhciBjb2RlID0gdHlwZW9mIGNoYXJhY3RlciA9PT0gJ3N0cmluZycgPyBjaGFyYWN0ZXIuY2hhckNvZGVBdCgwKSA6IGNoYXJhY3RlclxuXG4gIHJldHVybiAoXG4gICAgKGNvZGUgPj0gOTcgJiYgY29kZSA8PSAxMjIpIC8qIGEteiAqLyB8fFxuICAgIChjb2RlID49IDY1ICYmIGNvZGUgPD0gOTApIC8qIEEtWiAqL1xuICApXG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/is-alphabetical/index.js\n",
      );

      /***/
    },
};
