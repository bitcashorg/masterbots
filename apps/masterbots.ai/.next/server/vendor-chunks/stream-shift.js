/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/stream-shift";
exports.ids = ["vendor-chunks/stream-shift"];
exports.modules = {
  /***/ "(rsc)/../../node_modules/stream-shift/index.js":
    /*!************************************************!*\
  !*** ../../node_modules/stream-shift/index.js ***!
  \************************************************/
    /***/ (module) => {
      eval(
        "module.exports = shift\n\nfunction shift (stream) {\n  var rs = stream._readableState\n  if (!rs) return null\n  return (rs.objectMode || typeof stream._duplexState === 'number') ? stream.read() : stream.read(getStateLength(rs))\n}\n\nfunction getStateLength (state) {\n  if (state.buffer.length) {\n    var idx = state.bufferIndex || 0\n    // Since node 6.3.0 state.buffer is a BufferList not an array\n    if (state.buffer.head) {\n      return state.buffer.head.data.length\n    } else if (state.buffer.length - idx > 0 && state.buffer[idx]) {\n      return state.buffer[idx].length\n    }\n  }\n\n  return state.length\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL3N0cmVhbS1zaGlmdC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL3NoZXJpZmYvRGVza3RvcC9iaXRjYXNoLWFwcHMvbWFzdGVyYm90cy9ub2RlX21vZHVsZXMvc3RyZWFtLXNoaWZ0L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gc2hpZnRcblxuZnVuY3Rpb24gc2hpZnQgKHN0cmVhbSkge1xuICB2YXIgcnMgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGVcbiAgaWYgKCFycykgcmV0dXJuIG51bGxcbiAgcmV0dXJuIChycy5vYmplY3RNb2RlIHx8IHR5cGVvZiBzdHJlYW0uX2R1cGxleFN0YXRlID09PSAnbnVtYmVyJykgPyBzdHJlYW0ucmVhZCgpIDogc3RyZWFtLnJlYWQoZ2V0U3RhdGVMZW5ndGgocnMpKVxufVxuXG5mdW5jdGlvbiBnZXRTdGF0ZUxlbmd0aCAoc3RhdGUpIHtcbiAgaWYgKHN0YXRlLmJ1ZmZlci5sZW5ndGgpIHtcbiAgICB2YXIgaWR4ID0gc3RhdGUuYnVmZmVySW5kZXggfHwgMFxuICAgIC8vIFNpbmNlIG5vZGUgNi4zLjAgc3RhdGUuYnVmZmVyIGlzIGEgQnVmZmVyTGlzdCBub3QgYW4gYXJyYXlcbiAgICBpZiAoc3RhdGUuYnVmZmVyLmhlYWQpIHtcbiAgICAgIHJldHVybiBzdGF0ZS5idWZmZXIuaGVhZC5kYXRhLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAoc3RhdGUuYnVmZmVyLmxlbmd0aCAtIGlkeCA+IDAgJiYgc3RhdGUuYnVmZmVyW2lkeF0pIHtcbiAgICAgIHJldHVybiBzdGF0ZS5idWZmZXJbaWR4XS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RhdGUubGVuZ3RoXG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/stream-shift/index.js\n",
      );

      /***/
    },
};
