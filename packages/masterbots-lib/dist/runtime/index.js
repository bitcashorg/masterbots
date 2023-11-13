var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// src/runtime/index.ts
__export(exports, {
  platform: () => platform
});

// src/runtime/runtime.lib.ts
var import_lodash = __toModule(require("lodash"));
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
