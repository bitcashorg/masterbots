var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/encoding/index.ts
__export(exports, {
  base64Decode: () => base64Decode,
  base64Encode: () => base64Encode,
  getBase64: () => getBase64,
  validateUUID: () => validateUUID
});

// src/encoding/encoding.lib.ts
var base64Encode = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64");
var base64Decode = (str) => {
  try {
    return JSON.parse(Buffer.from(str, "base64").toString());
  } catch (error) {
    return Buffer.from(str).toString();
  }
};
function getBase64(file) {
  return new Promise((resolve, rejects) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      resolve(reader == null ? void 0 : reader.result);
    };
    reader.onerror = function(error) {
      rejects(error);
    };
  });
}
function validateUUID(str) {
  if (!str)
    return;
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(str);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  base64Decode,
  base64Encode,
  getBase64,
  validateUUID
});
