self.__BUILD_MANIFEST = (function (a, b, c, d, e, f, g) {
  return {
    __rewrites: {
      afterFiles: [
        {
          has: [
            { type: a, key: c, value: d },
            { type: a, key: e, value: f },
            { type: a, key: "r", value: "(?\u003Cregion\u003E[a-z]{2})" },
          ],
          source: g,
          destination: b,
        },
        {
          has: [
            { type: a, key: c, value: d },
            { type: a, key: e, value: f },
          ],
          source: g,
          destination: b,
        },
      ],
      beforeFiles: [],
      fallback: [],
    },
    __routerFilterStatic: b,
    __routerFilterDynamic: b,
    "/_error": ["static\u002Fchunks\u002Fpages\u002F_error.js"],
    sortedPages: ["\u002F_app", "\u002F_error"],
  };
})(
  "query",
  void 0,
  "o",
  "(?\u003Corgid\u003E\\d*)",
  "p",
  "(?\u003Cprojectid\u003E\\d*)",
  "\u002Fmonitoring(\u002F?)",
);
self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB();
