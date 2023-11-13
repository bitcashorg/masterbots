var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/blockchain/index.ts
__export(exports, {
  formatAddress: () => formatAddress
});

// src/blockchain/blockchain.lib.ts
function formatAddress(key) {
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatAddress
});
