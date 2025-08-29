"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/stubs";
exports.ids = ["vendor-chunks/stubs"];
exports.modules = {
  /***/ "(rsc)/../../node_modules/stubs/index.js":
    /*!*****************************************!*\
  !*** ../../node_modules/stubs/index.js ***!
  \*****************************************/
    /***/ (module) => {
      eval(
        "\n\nmodule.exports = function stubs(obj, method, cfg, stub) {\n  if (!obj || !method || !obj[method])\n    throw new Error('You must provide an object and a key for an existing method')\n\n  if (!stub) {\n    stub = cfg\n    cfg = {}\n  }\n\n  stub = stub || function() {}\n\n  cfg.callthrough = cfg.callthrough || false\n  cfg.calls = cfg.calls || 0\n\n  var norevert = cfg.calls === 0\n\n  var cached = obj[method].bind(obj)\n\n  obj[method] = function() {\n    var args = [].slice.call(arguments)\n    var returnVal\n\n    if (cfg.callthrough)\n      returnVal = cached.apply(obj, args)\n\n    returnVal = stub.apply(obj, args) || returnVal\n\n    if (!norevert && --cfg.calls === 0)\n      obj[method] = cached\n\n    return returnVal\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL3N0dWJzL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFZOztBQUVaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvc2hlcmlmZi9EZXNrdG9wL2JpdGNhc2gtYXBwcy9tYXN0ZXJib3RzL25vZGVfbW9kdWxlcy9zdHVicy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHVicyhvYmosIG1ldGhvZCwgY2ZnLCBzdHViKSB7XG4gIGlmICghb2JqIHx8ICFtZXRob2QgfHwgIW9ialttZXRob2RdKVxuICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgcHJvdmlkZSBhbiBvYmplY3QgYW5kIGEga2V5IGZvciBhbiBleGlzdGluZyBtZXRob2QnKVxuXG4gIGlmICghc3R1Yikge1xuICAgIHN0dWIgPSBjZmdcbiAgICBjZmcgPSB7fVxuICB9XG5cbiAgc3R1YiA9IHN0dWIgfHwgZnVuY3Rpb24oKSB7fVxuXG4gIGNmZy5jYWxsdGhyb3VnaCA9IGNmZy5jYWxsdGhyb3VnaCB8fCBmYWxzZVxuICBjZmcuY2FsbHMgPSBjZmcuY2FsbHMgfHwgMFxuXG4gIHZhciBub3JldmVydCA9IGNmZy5jYWxscyA9PT0gMFxuXG4gIHZhciBjYWNoZWQgPSBvYmpbbWV0aG9kXS5iaW5kKG9iailcblxuICBvYmpbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgdmFyIHJldHVyblZhbFxuXG4gICAgaWYgKGNmZy5jYWxsdGhyb3VnaClcbiAgICAgIHJldHVyblZhbCA9IGNhY2hlZC5hcHBseShvYmosIGFyZ3MpXG5cbiAgICByZXR1cm5WYWwgPSBzdHViLmFwcGx5KG9iaiwgYXJncykgfHwgcmV0dXJuVmFsXG5cbiAgICBpZiAoIW5vcmV2ZXJ0ICYmIC0tY2ZnLmNhbGxzID09PSAwKVxuICAgICAgb2JqW21ldGhvZF0gPSBjYWNoZWRcblxuICAgIHJldHVybiByZXR1cm5WYWxcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/stubs/index.js\n",
      );

      /***/
    },
};
