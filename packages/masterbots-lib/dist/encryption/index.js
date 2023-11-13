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
    for (let key2 of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key2) && key2 !== "default")
        __defProp(target, key2, { get: () => module2[key2], enumerable: !(desc = __getOwnPropDesc(module2, key2)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// src/encryption/index.ts
__export(exports, {
  decrypt: () => decrypt,
  encrypt: () => encrypt,
  isEncrypted: () => isEncrypted
});

// src/encryption/encryption.lib.ts
var import_crypto = __toModule(require("crypto"));
var algorithm = "aes-256-cbc";
var key = "9314214900ed961a9f15688e0e2f26f3c5afa8dd56afb8c527602548e53d1883";
var IV_LENGHT = 16;
var decrypt = (text) => {
  const alltexts = text.includes(":") ? text.split(":") : [];
  const privateIV = alltexts.shift() || "";
  const finaltext = alltexts.shift() || "";
  const encryptedText = Buffer.from(finaltext, "hex");
  const decipher = (0, import_crypto.createDecipheriv)(algorithm, Buffer.from(key, "hex"), Buffer.from(privateIV, "hex"));
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
var encrypt = (param) => {
  const iv = (0, import_crypto.randomBytes)(IV_LENGHT);
  const cipher = (0, import_crypto.createCipheriv)(algorithm, Buffer.from(key, "hex"), iv);
  let encrypted = cipher.update(param);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};
var isEncrypted = (param) => {
  if (param && param.length > 0 && param.length == 65 && param.includes(":")) {
    const alltexts = param.split(":");
    const first = alltexts.shift() || "";
    const second = alltexts.shift() || "";
    return first.length == 32 && second.length == 32;
  }
  return false;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  decrypt,
  encrypt,
  isEncrypted
});
