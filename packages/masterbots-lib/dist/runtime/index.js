"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/runtime/index.ts
var runtime_exports = {};
__export(runtime_exports, {
  platform: () => platform
});
module.exports = __toCommonJS(runtime_exports);

// src/runtime/runtime.lib.ts
var import_lodash = __toESM(require("lodash"));
var platform = (() => {
  const isBrowser = typeof window !== "undefined";
  const userAgent = isBrowser ? import_lodash.default.get(window, "navigator.userAgent") : "";
  const isAndroid = /(Android)/i.test(userAgent);
  const isPhone = /(iPhone|iPod)/i.test(userAgent);
  const isIpad = /(iPad)/i.test(userAgent);
  const isMobile = isPhone || isAndroid;
  const solana = isBrowser && import_lodash.default.get(window, "solana");
  const isPhantom = isBrowser && import_lodash.default.has(window, "solana.isPhantom");
  return {
    userAgent,
    isBrowser,
    isNode: !isBrowser,
    isPhone,
    isIpad,
    isMobile,
    isPhantom,
    solana
  };
})();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  platform
});
