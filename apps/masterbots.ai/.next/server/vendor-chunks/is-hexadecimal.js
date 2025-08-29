"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-hexadecimal";
exports.ids = ["vendor-chunks/is-hexadecimal"];
exports.modules = {
  /***/ "(ssr)/../../node_modules/is-hexadecimal/index.js":
    /*!**************************************************!*\
  !*** ../../node_modules/is-hexadecimal/index.js ***!
  \**************************************************/
    /***/ (module) => {
      eval(
        "\n\nmodule.exports = hexadecimal\n\n// Check if the given character code, or the character code at the first\n// character, is hexadecimal.\nfunction hexadecimal(character) {\n  var code = typeof character === 'string' ? character.charCodeAt(0) : character\n\n  return (\n    (code >= 97 /* a */ && code <= 102) /* z */ ||\n    (code >= 65 /* A */ && code <= 70) /* Z */ ||\n    (code >= 48 /* A */ && code <= 57) /* Z */\n  )\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzL2lzLWhleGFkZWNpbWFsL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFZOztBQUVaOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL3NoZXJpZmYvRGVza3RvcC9iaXRjYXNoLWFwcHMvbWFzdGVyYm90cy9ub2RlX21vZHVsZXMvaXMtaGV4YWRlY2ltYWwvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gaGV4YWRlY2ltYWxcblxuLy8gQ2hlY2sgaWYgdGhlIGdpdmVuIGNoYXJhY3RlciBjb2RlLCBvciB0aGUgY2hhcmFjdGVyIGNvZGUgYXQgdGhlIGZpcnN0XG4vLyBjaGFyYWN0ZXIsIGlzIGhleGFkZWNpbWFsLlxuZnVuY3Rpb24gaGV4YWRlY2ltYWwoY2hhcmFjdGVyKSB7XG4gIHZhciBjb2RlID0gdHlwZW9mIGNoYXJhY3RlciA9PT0gJ3N0cmluZycgPyBjaGFyYWN0ZXIuY2hhckNvZGVBdCgwKSA6IGNoYXJhY3RlclxuXG4gIHJldHVybiAoXG4gICAgKGNvZGUgPj0gOTcgLyogYSAqLyAmJiBjb2RlIDw9IDEwMikgLyogeiAqLyB8fFxuICAgIChjb2RlID49IDY1IC8qIEEgKi8gJiYgY29kZSA8PSA3MCkgLyogWiAqLyB8fFxuICAgIChjb2RlID49IDQ4IC8qIEEgKi8gJiYgY29kZSA8PSA1NykgLyogWiAqL1xuICApXG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/is-hexadecimal/index.js\n",
      );

      /***/
    },
};
