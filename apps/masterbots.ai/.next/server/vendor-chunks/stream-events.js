"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/stream-events";
exports.ids = ["vendor-chunks/stream-events"];
exports.modules = {
  /***/ "(rsc)/../../node_modules/stream-events/index.js":
    /*!*************************************************!*\
  !*** ../../node_modules/stream-events/index.js ***!
  \*************************************************/
    /***/ (module, __unused_webpack_exports, __webpack_require__) => {
      eval(
        "\n\nvar stubs = __webpack_require__(/*! stubs */ \"(rsc)/../../node_modules/stubs/index.js\")\n\n/*\n * StreamEvents can be used 2 ways:\n *\n * 1:\n * function MyStream() {\n *   require('stream-events').call(this)\n * }\n *\n * 2:\n * require('stream-events')(myStream)\n */\nfunction StreamEvents(stream) {\n  stream = stream || this\n\n  var cfg = {\n    callthrough: true,\n    calls: 1\n  }\n\n  stubs(stream, '_read', cfg, stream.emit.bind(stream, 'reading'))\n  stubs(stream, '_write', cfg, stream.emit.bind(stream, 'writing'))\n\n  return stream\n}\n\nmodule.exports = StreamEvents\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL3N0cmVhbS1ldmVudHMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHNEQUFPOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIi9Vc2Vycy9zaGVyaWZmL0Rlc2t0b3AvYml0Y2FzaC1hcHBzL21hc3RlcmJvdHMvbm9kZV9tb2R1bGVzL3N0cmVhbS1ldmVudHMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3R1YnMgPSByZXF1aXJlKCdzdHVicycpXG5cbi8qXG4gKiBTdHJlYW1FdmVudHMgY2FuIGJlIHVzZWQgMiB3YXlzOlxuICpcbiAqIDE6XG4gKiBmdW5jdGlvbiBNeVN0cmVhbSgpIHtcbiAqICAgcmVxdWlyZSgnc3RyZWFtLWV2ZW50cycpLmNhbGwodGhpcylcbiAqIH1cbiAqXG4gKiAyOlxuICogcmVxdWlyZSgnc3RyZWFtLWV2ZW50cycpKG15U3RyZWFtKVxuICovXG5mdW5jdGlvbiBTdHJlYW1FdmVudHMoc3RyZWFtKSB7XG4gIHN0cmVhbSA9IHN0cmVhbSB8fCB0aGlzXG5cbiAgdmFyIGNmZyA9IHtcbiAgICBjYWxsdGhyb3VnaDogdHJ1ZSxcbiAgICBjYWxsczogMVxuICB9XG5cbiAgc3R1YnMoc3RyZWFtLCAnX3JlYWQnLCBjZmcsIHN0cmVhbS5lbWl0LmJpbmQoc3RyZWFtLCAncmVhZGluZycpKVxuICBzdHVicyhzdHJlYW0sICdfd3JpdGUnLCBjZmcsIHN0cmVhbS5lbWl0LmJpbmQoc3RyZWFtLCAnd3JpdGluZycpKVxuXG4gIHJldHVybiBzdHJlYW1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdHJlYW1FdmVudHNcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/stream-events/index.js\n",
      );

      /***/
    },
};
