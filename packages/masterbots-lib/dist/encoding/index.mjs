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
export {
  base64Decode,
  base64Encode,
  getBase64,
  validateUUID
};
