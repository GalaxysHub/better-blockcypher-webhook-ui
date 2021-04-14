const CoinList = [
  { name: "Blockcypher", abbr: "BCY" },
  { name: "Bitcoin Testnet", abbr: "BTCt" },
  { name: "Bitcoin", abbr: "BTC" },
  { name: "Litecoin", abbr: "LTC" },
  { name: "Dogecoin", abbr: "DOGE" },
  { name: "Dash", abbr: "DASH" },
];

const CoinData = {
  BTC: {
    id: "bitcoin",
    WIF: "80",
    addr: "00",
    COIN: "btc",
    NETWORK: "test",
    addrStarts: ["1", "3"], //todo: add support for bech32 addrs
  },
  BTCt: {
    id: "bitcoin",
    WIF: "ef",
    addr: "6F",
    COIN: "btc",
    NETWORK: "test3",
    addrStarts: ["n", "m"],
  },
  BCY: {
    id: "bitcoin",
    WIF: "ef",
    addr: "1B",
    COIN: "bcy",
    NETWORK: "test",
    addrStarts: ["B", "C"],
  },
  LTC: {
    id: "litecoin",
    WIF: "b0",
    addr: "30",
    COIN: "ltc",
    NETWORK: "main",
  },
  DOGE: {
    id: "dogecoin",
    WIF: "9e",
    addr: "1e",
    COIN: "doge",
    NETWORK: "main",
  },
  DASH: {
    id: "dash",
    WIF: "cc",
    addr: "4c",
    COIN: "dash",
    NETWORK: "main",
  },
};

module.exports = {
  CoinList,
  CoinData,
};
