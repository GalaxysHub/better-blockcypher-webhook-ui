const CoinList = [
  { name: "Blockcypher", abbr: "BCY" },
  { name: "Bitcoin Testnet", abbr: "BTCt" },
  { name: "Bitcoin", abbr: "BTC" },
  { name: "Litecoin", abbr: "LTC" },
  { name: "Dogecoin", abbr: "DOGE" },
  { name: "Dash", abbr: "DASH" },
  { name: "Ethereum", abbr: "ETH" },
  { name: "Ethereum BC Testnet", abbr: "bETH" },
];

const CoinData = {
  BTC: {
    id: "bitcoin", // poor nomenclature. need to check original intent before changing
    name: "Bitcoin",
    WIF: "80",
    addr: "00",
    COIN: "btc",
    NETWORK: "main",
    addrPrefixes: ["1", "3"], //todo: add support for bech32 addrs
  },
  BTCt: {
    id: "bitcoin",
    name: "Bitcoin Testnet",
    WIF: "ef",
    addr: "6F",
    COIN: "btc",
    NETWORK: "test3",
    addrPrefixes: ["n", "m"],
  },
  BCY: {
    id: "bitcoin",
    name: "Blockcypher",
    WIF: "ef",
    addr: "1B",
    COIN: "bcy",
    NETWORK: "test",
    addrPrefixes: ["B", "C"],
  },
  LTC: {
    id: "litecoin",
    name: "Litecoin",
    WIF: "b0",
    addr: "30",
    COIN: "ltc",
    NETWORK: "main",
  },
  DOGE: {
    id: "dogecoin",
    name: "Dogecoin",
    WIF: "9e",
    addr: "1e",
    COIN: "doge",
    NETWORK: "main",
  },
  DASH: {
    id: "dash",
    name: "Dash",
    WIF: "cc",
    addr: "4c",
    COIN: "dash",
    NETWORK: "main",
  },
  ETH: {
    id: "eth",
    name: "Ethereum",
    COIN: "eth",
    NETWORK: "main",
    addrPrefixes: ["0x"],
  },
  //blockcypher specific testnet
  bETH: {
    id: "bETH",
    name: "Ethereum BC Testnet",
    COIN: "beth",
    NETWORK: "test",
  },
};

module.exports = {
  CoinList,
  CoinData,
};
