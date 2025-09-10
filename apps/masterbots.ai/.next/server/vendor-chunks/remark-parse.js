"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/remark-parse";
exports.ids = ["vendor-chunks/remark-parse"];
exports.modules = {
  /***/ "(ssr)/../../node_modules/remark-parse/lib/index.js":
    /*!****************************************************!*\
  !*** ../../node_modules/remark-parse/lib/index.js ***!
  \****************************************************/
    /***/ (
      __unused_webpack___webpack_module__,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      eval(
        "__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ remarkParse)\n/* harmony export */ });\n/* harmony import */ var mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdast-util-from-markdown */ \"(ssr)/../../node_modules/mdast-util-from-markdown/dev/lib/index.js\");\n/**\n * @typedef {import('mdast').Root} Root\n * @typedef {import('mdast-util-from-markdown').Options} FromMarkdownOptions\n * @typedef {import('unified').Parser<Root>} Parser\n * @typedef {import('unified').Processor<Root>} Processor\n */\n\n/**\n * @typedef {Omit<FromMarkdownOptions, 'extensions' | 'mdastExtensions'>} Options\n */\n\n\n\n/**\n * Aadd support for parsing from markdown.\n *\n * @param {Readonly<Options> | null | undefined} [options]\n *   Configuration (optional).\n * @returns {undefined}\n *   Nothing.\n */\nfunction remarkParse(options) {\n  /** @type {Processor} */\n  // @ts-expect-error: TS in JSDoc generates wrong types if `this` is typed regularly.\n  const self = this\n\n  self.parser = parser\n\n  /**\n   * @type {Parser}\n   */\n  function parser(doc) {\n    return (0,mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_0__.fromMarkdown)(doc, {\n      ...self.data('settings'),\n      ...options,\n      // Note: these options are not in the readme.\n      // The goal is for them to be set by plugins on `data` instead of being\n      // passed by users.\n      extensions: self.data('micromarkExtensions') || [],\n      mdastExtensions: self.data('fromMarkdownExtensions') || []\n    })\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzL3JlbWFyay1wYXJzZS9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLGFBQWEsc0JBQXNCO0FBQ25DLGFBQWEsNENBQTRDO0FBQ3pELGFBQWEsZ0NBQWdDO0FBQzdDLGFBQWEsbUNBQW1DO0FBQ2hEOztBQUVBO0FBQ0EsYUFBYSw2REFBNkQ7QUFDMUU7O0FBRXFEOztBQUVyRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLHNDQUFzQztBQUNqRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ2U7QUFDZixhQUFhLFdBQVc7QUFDeEI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsV0FBVyxzRUFBWTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvc2hlcmlmZi9EZXNrdG9wL2JpdGNhc2gtYXBwcy9tYXN0ZXJib3RzL25vZGVfbW9kdWxlcy9yZW1hcmstcGFyc2UvbGliL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QnKS5Sb290fSBSb290XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdC11dGlsLWZyb20tbWFya2Rvd24nKS5PcHRpb25zfSBGcm9tTWFya2Rvd25PcHRpb25zXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCd1bmlmaWVkJykuUGFyc2VyPFJvb3Q+fSBQYXJzZXJcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ3VuaWZpZWQnKS5Qcm9jZXNzb3I8Um9vdD59IFByb2Nlc3NvclxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09taXQ8RnJvbU1hcmtkb3duT3B0aW9ucywgJ2V4dGVuc2lvbnMnIHwgJ21kYXN0RXh0ZW5zaW9ucyc+fSBPcHRpb25zXG4gKi9cblxuaW1wb3J0IHtmcm9tTWFya2Rvd259IGZyb20gJ21kYXN0LXV0aWwtZnJvbS1tYXJrZG93bidcblxuLyoqXG4gKiBBYWRkIHN1cHBvcnQgZm9yIHBhcnNpbmcgZnJvbSBtYXJrZG93bi5cbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5PE9wdGlvbnM+IHwgbnVsbCB8IHVuZGVmaW5lZH0gW29wdGlvbnNdXG4gKiAgIENvbmZpZ3VyYXRpb24gKG9wdGlvbmFsKS5cbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKiAgIE5vdGhpbmcuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbWFya1BhcnNlKG9wdGlvbnMpIHtcbiAgLyoqIEB0eXBlIHtQcm9jZXNzb3J9ICovXG4gIC8vIEB0cy1leHBlY3QtZXJyb3I6IFRTIGluIEpTRG9jIGdlbmVyYXRlcyB3cm9uZyB0eXBlcyBpZiBgdGhpc2AgaXMgdHlwZWQgcmVndWxhcmx5LlxuICBjb25zdCBzZWxmID0gdGhpc1xuXG4gIHNlbGYucGFyc2VyID0gcGFyc2VyXG5cbiAgLyoqXG4gICAqIEB0eXBlIHtQYXJzZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBwYXJzZXIoZG9jKSB7XG4gICAgcmV0dXJuIGZyb21NYXJrZG93bihkb2MsIHtcbiAgICAgIC4uLnNlbGYuZGF0YSgnc2V0dGluZ3MnKSxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAvLyBOb3RlOiB0aGVzZSBvcHRpb25zIGFyZSBub3QgaW4gdGhlIHJlYWRtZS5cbiAgICAgIC8vIFRoZSBnb2FsIGlzIGZvciB0aGVtIHRvIGJlIHNldCBieSBwbHVnaW5zIG9uIGBkYXRhYCBpbnN0ZWFkIG9mIGJlaW5nXG4gICAgICAvLyBwYXNzZWQgYnkgdXNlcnMuXG4gICAgICBleHRlbnNpb25zOiBzZWxmLmRhdGEoJ21pY3JvbWFya0V4dGVuc2lvbnMnKSB8fCBbXSxcbiAgICAgIG1kYXN0RXh0ZW5zaW9uczogc2VsZi5kYXRhKCdmcm9tTWFya2Rvd25FeHRlbnNpb25zJykgfHwgW11cbiAgICB9KVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/remark-parse/lib/index.js\n",
      );

      /***/
    },
};
