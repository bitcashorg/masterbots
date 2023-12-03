"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/encryption/index.ts
var encryption_exports = {};
__export(encryption_exports, {
  decrypt: () => decrypt,
  encrypt: () => encrypt,
  isEncrypted: () => isEncrypted
});
module.exports = __toCommonJS(encryption_exports);

// src/encryption/encryption.lib.ts
var import_crypto = require("crypto");
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
