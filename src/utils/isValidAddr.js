import bs58 from "bs58";
import sha256 from "js-sha256";

import { CoinData } from "config/coinData.js";

export const isValidAddr = (addr, coin) => {
  let first = addr[0];
  let addrPrefixes = CoinData[coin].addrPrefixes;
  if (!addrPrefixes.includes(first)) return new Error("Wrong Address Type");

  if (addr.length !== 34) return new Error("Invalid Address format");

  let hex = bs58.decode(addr);
  let hexString = hex.toString("hex");
  let checksum = hexString.substring(42, 50);
  let pubKey = hexString.substring(0, 42);
  let hash = sha256(Buffer.from(pubKey, "hex"));
  let doubleHash = sha256(Buffer.from(hash, "hex"));
  if (checksum !== doubleHash.substring(0, 8))
    return new Error("Invalid Address Format");

  return true;
};
