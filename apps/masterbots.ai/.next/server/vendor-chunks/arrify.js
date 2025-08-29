"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/arrify";
exports.ids = ["vendor-chunks/arrify"];
exports.modules = {
  /***/ "(rsc)/../../node_modules/arrify/index.js":
    /*!******************************************!*\
  !*** ../../node_modules/arrify/index.js ***!
  \******************************************/
    /***/ (module) => {
      eval(
        "\n\nconst arrify = value => {\n\tif (value === null || value === undefined) {\n\t\treturn [];\n\t}\n\n\tif (Array.isArray(value)) {\n\t\treturn value;\n\t}\n\n\tif (typeof value === 'string') {\n\t\treturn [value];\n\t}\n\n\tif (typeof value[Symbol.iterator] === 'function') {\n\t\treturn [...value];\n\t}\n\n\treturn [value];\n};\n\nmodule.exports = arrify;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL2FycmlmeS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyIvVXNlcnMvc2hlcmlmZi9EZXNrdG9wL2JpdGNhc2gtYXBwcy9tYXN0ZXJib3RzL25vZGVfbW9kdWxlcy9hcnJpZnkvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcnJpZnkgPSB2YWx1ZSA9PiB7XG5cdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gW3ZhbHVlXTtcblx0fVxuXG5cdGlmICh0eXBlb2YgdmFsdWVbU3ltYm9sLml0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBbLi4udmFsdWVdO1xuXHR9XG5cblx0cmV0dXJuIFt2YWx1ZV07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmlmeTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/arrify/index.js\n",
      );

      /***/
    },
};
