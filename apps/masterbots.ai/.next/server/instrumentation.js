/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
  var exports = {};
  exports.id = "instrumentation";
  exports.ids = ["instrumentation"];
  exports.modules = {
    /***/ "(instrument)/../../node_modules/@opentelemetry/instrumentation/build/esm/platform/node sync recursive":
      /*!***************************************************************************************!*\
  !*** ../../node_modules/@opentelemetry/instrumentation/build/esm/platform/node/ sync ***!
  \***************************************************************************************/
      /***/ (module) => {
        function webpackEmptyContext(req) {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = "MODULE_NOT_FOUND";
          throw e;
        }
        webpackEmptyContext.keys = () => [];
        webpackEmptyContext.resolve = webpackEmptyContext;
        webpackEmptyContext.id =
          "(instrument)/../../node_modules/@opentelemetry/instrumentation/build/esm/platform/node sync recursive";
        module.exports = webpackEmptyContext;

        /***/
      },

    /***/ "(instrument)/./instrumentation.ts":
      /*!****************************!*\
  !*** ./instrumentation.ts ***!
  \****************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   onRequestError: () => (/* binding */ onRequestError),\n/* harmony export */   register: () => (/* binding */ register)\n/* harmony export */ });\n/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/nextjs */ "(instrument)/../../node_modules/@sentry/nextjs/build/cjs/index.server.js");\n/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__);\nglobalThis["_sentryRewritesTunnelPath"] = "/monitoring";\nglobalThis["SENTRY_RELEASE"] = undefined;\nglobalThis["_sentryBasePath"] = undefined;\nglobalThis["_sentryRewriteFramesDistDir"] = ".next";\n\nasync function register() {\n    if (true) {\n        await __webpack_require__.e(/*! import() */ "_instrument_sentry_server_config_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./sentry.server.config */ "(instrument)/./sentry.server.config.ts"));\n    }\n    if (false) {}\n}\nconst onRequestError = _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.captureRequestError;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGluc3RydW1lbnQpLy4vaW5zdHJ1bWVudGF0aW9uLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQ0EsVUFBVSxDQUFDLDRCQUE0QixHQUFHO0FBQWNBLFVBQVUsQ0FBQyxpQkFBaUIsR0FBR0M7QUFBVUQsVUFBVSxDQUFDLGtCQUFrQixHQUFHQztBQUFVRCxVQUFVLENBQUMsOEJBQThCLEdBQUc7QUFBZ0Q7QUFFak8sZUFBZUc7SUFDckIsSUFBSUMsSUFBcUMsRUFBRTtRQUMxQyxNQUFNLHdNQUFnQztJQUN2QztJQUVBLElBQUlBLEtBQW1DLEVBQUUsRUFFeEM7QUFDRjtBQUVPLE1BQU1HLGlCQUFpQkwsK0RBQTBCIiwic291cmNlcyI6WyIvVXNlcnMvc2hlcmlmZi9EZXNrdG9wL2JpdGNhc2gtYXBwcy9tYXN0ZXJib3RzL2FwcHMvbWFzdGVyYm90cy5haS9pbnN0cnVtZW50YXRpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiO2dsb2JhbFRoaXNbXCJfc2VudHJ5UmV3cml0ZXNUdW5uZWxQYXRoXCJdID0gXCIvbW9uaXRvcmluZ1wiO2dsb2JhbFRoaXNbXCJTRU5UUllfUkVMRUFTRVwiXSA9IHVuZGVmaW5lZDtnbG9iYWxUaGlzW1wiX3NlbnRyeUJhc2VQYXRoXCJdID0gdW5kZWZpbmVkO2dsb2JhbFRoaXNbXCJfc2VudHJ5UmV3cml0ZUZyYW1lc0Rpc3REaXJcIl0gPSBcIi5uZXh0XCI7aW1wb3J0ICogYXMgU2VudHJ5IGZyb20gJ0BzZW50cnkvbmV4dGpzJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXIoKSB7XG5cdGlmIChwcm9jZXNzLmVudi5ORVhUX1JVTlRJTUUgPT09ICdub2RlanMnKSB7XG5cdFx0YXdhaXQgaW1wb3J0KCcuL3NlbnRyeS5zZXJ2ZXIuY29uZmlnJylcblx0fVxuXG5cdGlmIChwcm9jZXNzLmVudi5ORVhUX1JVTlRJTUUgPT09ICdlZGdlJykge1xuXHRcdGF3YWl0IGltcG9ydCgnLi9zZW50cnkuZWRnZS5jb25maWcnKVxuXHR9XG59XG5cbmV4cG9ydCBjb25zdCBvblJlcXVlc3RFcnJvciA9IFNlbnRyeS5jYXB0dXJlUmVxdWVzdEVycm9yXG4iXSwibmFtZXMiOlsiZ2xvYmFsVGhpcyIsInVuZGVmaW5lZCIsIlNlbnRyeSIsInJlZ2lzdGVyIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUlVOVElNRSIsIm9uUmVxdWVzdEVycm9yIiwiY2FwdHVyZVJlcXVlc3RFcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(instrument)/./instrumentation.ts\n',
        );

        /***/
      },

    /***/ async_hooks:
      /*!******************************!*\
  !*** external "async_hooks" ***!
  \******************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("async_hooks");

        /***/
      },

    /***/ child_process:
      /*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("child_process");

        /***/
      },

    /***/ crypto:
      /*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("crypto");

        /***/
      },

    /***/ diagnostics_channel:
      /*!**************************************!*\
  !*** external "diagnostics_channel" ***!
  \**************************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("diagnostics_channel");

        /***/
      },

    /***/ events:
      /*!*************************!*\
  !*** external "events" ***!
  \*************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("events");

        /***/
      },

    /***/ fs:
      /*!*********************!*\
  !*** external "fs" ***!
  \*********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("fs");

        /***/
      },

    /***/ "import-in-the-middle":
      /*!***************************************!*\
  !*** external "import-in-the-middle" ***!
  \***************************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("import-in-the-middle");

        /***/
      },

    /***/ module:
      /*!*************************!*\
  !*** external "module" ***!
  \*************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("module");

        /***/
      },

    /***/ "node:child_process":
      /*!*************************************!*\
  !*** external "node:child_process" ***!
  \*************************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:child_process");

        /***/
      },

    /***/ "node:diagnostics_channel":
      /*!*******************************************!*\
  !*** external "node:diagnostics_channel" ***!
  \*******************************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:diagnostics_channel");

        /***/
      },

    /***/ "node:fs":
      /*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:fs");

        /***/
      },

    /***/ "node:http":
      /*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:http");

        /***/
      },

    /***/ "node:https":
      /*!*****************************!*\
  !*** external "node:https" ***!
  \*****************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:https");

        /***/
      },

    /***/ "node:inspector":
      /*!*********************************!*\
  !*** external "node:inspector" ***!
  \*********************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:inspector");

        /***/
      },

    /***/ "node:net":
      /*!***************************!*\
  !*** external "node:net" ***!
  \***************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:net");

        /***/
      },

    /***/ "node:os":
      /*!**************************!*\
  !*** external "node:os" ***!
  \**************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:os");

        /***/
      },

    /***/ "node:path":
      /*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:path");

        /***/
      },

    /***/ "node:readline":
      /*!********************************!*\
  !*** external "node:readline" ***!
  \********************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:readline");

        /***/
      },

    /***/ "node:stream":
      /*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:stream");

        /***/
      },

    /***/ "node:tls":
      /*!***************************!*\
  !*** external "node:tls" ***!
  \***************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:tls");

        /***/
      },

    /***/ "node:util":
      /*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:util");

        /***/
      },

    /***/ "node:worker_threads":
      /*!**************************************!*\
  !*** external "node:worker_threads" ***!
  \**************************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:worker_threads");

        /***/
      },

    /***/ "node:zlib":
      /*!****************************!*\
  !*** external "node:zlib" ***!
  \****************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("node:zlib");

        /***/
      },

    /***/ os:
      /*!*********************!*\
  !*** external "os" ***!
  \*********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("os");

        /***/
      },

    /***/ path:
      /*!***********************!*\
  !*** external "path" ***!
  \***********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("path");

        /***/
      },

    /***/ perf_hooks:
      /*!*****************************!*\
  !*** external "perf_hooks" ***!
  \*****************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("perf_hooks");

        /***/
      },

    /***/ process:
      /*!**************************!*\
  !*** external "process" ***!
  \**************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("process");

        /***/
      },

    /***/ "require-in-the-middle":
      /*!****************************************!*\
  !*** external "require-in-the-middle" ***!
  \****************************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("require-in-the-middle");

        /***/
      },

    /***/ tty:
      /*!**********************!*\
  !*** external "tty" ***!
  \**********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("tty");

        /***/
      },

    /***/ url:
      /*!**********************!*\
  !*** external "url" ***!
  \**********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("url");

        /***/
      },

    /***/ util:
      /*!***********************!*\
  !*** external "util" ***!
  \***********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("util");

        /***/
      },

    /***/ worker_threads:
      /*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("worker_threads");

        /***/
      },
  };
  // load runtime
  var __webpack_require__ = require("./webpack-runtime.js");
  __webpack_require__.C(exports);
  var __webpack_exec__ = (moduleId) =>
    __webpack_require__((__webpack_require__.s = moduleId));
  var __webpack_exports__ = __webpack_require__.X(
    0,
    [
      "vendor-chunks/next",
      "vendor-chunks/@swc",
      "vendor-chunks/@opentelemetry",
      "vendor-chunks/@sentry",
      "vendor-chunks/semver",
      "vendor-chunks/color-convert",
      "vendor-chunks/@prisma",
      "vendor-chunks/is-core-module",
      "vendor-chunks/forwarded-parse",
      "vendor-chunks/color-name",
      "vendor-chunks/ansi-styles",
      "vendor-chunks/stacktrace-parser",
      "vendor-chunks/shimmer",
      "vendor-chunks/supports-color",
      "vendor-chunks/function-bind",
      "vendor-chunks/path-parse",
      "vendor-chunks/balanced-match",
      "vendor-chunks/has-flag",
      "vendor-chunks/hasown",
    ],
    () => __webpack_exec__("(instrument)/./instrumentation.ts"),
  );
  module.exports = __webpack_exports__;
})();
