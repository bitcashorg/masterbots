// src/blockchain/blockchain.lib.ts
function formatAddress(key) {
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}
export {
  formatAddress
};
