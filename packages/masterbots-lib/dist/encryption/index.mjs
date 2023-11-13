// src/encryption/encryption.lib.ts
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
var algorithm = "aes-256-cbc";
var key = "9314214900ed961a9f15688e0e2f26f3c5afa8dd56afb8c527602548e53d1883";
var IV_LENGHT = 16;
var decrypt = (text) => {
  const alltexts = text.includes(":") ? text.split(":") : [];
  const privateIV = alltexts.shift() || "";
  const finaltext = alltexts.shift() || "";
  const encryptedText = Buffer.from(finaltext, "hex");
  const decipher = createDecipheriv(algorithm, Buffer.from(key, "hex"), Buffer.from(privateIV, "hex"));
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
var encrypt = (param) => {
  const iv = randomBytes(IV_LENGHT);
  const cipher = createCipheriv(algorithm, Buffer.from(key, "hex"), iv);
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
export {
  decrypt,
  encrypt,
  isEncrypted
};
