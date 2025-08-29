"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mdast-util-phrasing";
exports.ids = ["vendor-chunks/mdast-util-phrasing"];
exports.modules = {
  /***/ "(ssr)/../../node_modules/mdast-util-phrasing/lib/index.js":
    /*!***********************************************************!*\
  !*** ../../node_modules/mdast-util-phrasing/lib/index.js ***!
  \***********************************************************/
    /***/ (
      __unused_webpack___webpack_module__,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      eval(
        "__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   phrasing: () => (/* binding */ phrasing)\n/* harmony export */ });\n/* harmony import */ var unist_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-is */ \"(ssr)/../../node_modules/unist-util-is/lib/index.js\");\n/**\n * @typedef {import('mdast').Html} Html\n * @typedef {import('mdast').PhrasingContent} PhrasingContent\n */\n\n\n\n/**\n * Check if the given value is *phrasing content*.\n *\n * > 👉 **Note**: Excludes `html`, which can be both phrasing or flow.\n *\n * @param node\n *   Thing to check, typically `Node`.\n * @returns\n *   Whether `value` is phrasing content.\n */\n\nconst phrasing =\n  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */\n  (\n    (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__.convert)([\n      'break',\n      'delete',\n      'emphasis',\n      // To do: next major: removed since footnotes were added to GFM.\n      'footnote',\n      'footnoteReference',\n      'image',\n      'imageReference',\n      'inlineCode',\n      // Enabled by `mdast-util-math`:\n      'inlineMath',\n      'link',\n      'linkReference',\n      // Enabled by `mdast-util-mdx`:\n      'mdxJsxTextElement',\n      // Enabled by `mdast-util-mdx`:\n      'mdxTextExpression',\n      'strong',\n      'text',\n      // Enabled by `mdast-util-directive`:\n      'textDirective'\n    ])\n  )\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzL21kYXN0LXV0aWwtcGhyYXNpbmcvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQSxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhLGlDQUFpQztBQUM5Qzs7QUFFcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1AsYUFBYSw0REFBNEQ7QUFDekU7QUFDQSxJQUFJLHNEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL3NoZXJpZmYvRGVza3RvcC9iaXRjYXNoLWFwcHMvbWFzdGVyYm90cy9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC1waHJhc2luZy9saWIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLkh0bWx9IEh0bWxcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0JykuUGhyYXNpbmdDb250ZW50fSBQaHJhc2luZ0NvbnRlbnRcbiAqL1xuXG5pbXBvcnQge2NvbnZlcnR9IGZyb20gJ3VuaXN0LXV0aWwtaXMnXG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhbHVlIGlzICpwaHJhc2luZyBjb250ZW50Ki5cbiAqXG4gKiA+IPCfkYkgKipOb3RlKio6IEV4Y2x1ZGVzIGBodG1sYCwgd2hpY2ggY2FuIGJlIGJvdGggcGhyYXNpbmcgb3IgZmxvdy5cbiAqXG4gKiBAcGFyYW0gbm9kZVxuICogICBUaGluZyB0byBjaGVjaywgdHlwaWNhbGx5IGBOb2RlYC5cbiAqIEByZXR1cm5zXG4gKiAgIFdoZXRoZXIgYHZhbHVlYCBpcyBwaHJhc2luZyBjb250ZW50LlxuICovXG5cbmV4cG9ydCBjb25zdCBwaHJhc2luZyA9XG4gIC8qKiBAdHlwZSB7KG5vZGU/OiB1bmtub3duKSA9PiBub2RlIGlzIEV4Y2x1ZGU8UGhyYXNpbmdDb250ZW50LCBIdG1sPn0gKi9cbiAgKFxuICAgIGNvbnZlcnQoW1xuICAgICAgJ2JyZWFrJyxcbiAgICAgICdkZWxldGUnLFxuICAgICAgJ2VtcGhhc2lzJyxcbiAgICAgIC8vIFRvIGRvOiBuZXh0IG1ham9yOiByZW1vdmVkIHNpbmNlIGZvb3Rub3RlcyB3ZXJlIGFkZGVkIHRvIEdGTS5cbiAgICAgICdmb290bm90ZScsXG4gICAgICAnZm9vdG5vdGVSZWZlcmVuY2UnLFxuICAgICAgJ2ltYWdlJyxcbiAgICAgICdpbWFnZVJlZmVyZW5jZScsXG4gICAgICAnaW5saW5lQ29kZScsXG4gICAgICAvLyBFbmFibGVkIGJ5IGBtZGFzdC11dGlsLW1hdGhgOlxuICAgICAgJ2lubGluZU1hdGgnLFxuICAgICAgJ2xpbmsnLFxuICAgICAgJ2xpbmtSZWZlcmVuY2UnLFxuICAgICAgLy8gRW5hYmxlZCBieSBgbWRhc3QtdXRpbC1tZHhgOlxuICAgICAgJ21keEpzeFRleHRFbGVtZW50JyxcbiAgICAgIC8vIEVuYWJsZWQgYnkgYG1kYXN0LXV0aWwtbWR4YDpcbiAgICAgICdtZHhUZXh0RXhwcmVzc2lvbicsXG4gICAgICAnc3Ryb25nJyxcbiAgICAgICd0ZXh0JyxcbiAgICAgIC8vIEVuYWJsZWQgYnkgYG1kYXN0LXV0aWwtZGlyZWN0aXZlYDpcbiAgICAgICd0ZXh0RGlyZWN0aXZlJ1xuICAgIF0pXG4gIClcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/mdast-util-phrasing/lib/index.js\n",
      );

      /***/
    },
};
