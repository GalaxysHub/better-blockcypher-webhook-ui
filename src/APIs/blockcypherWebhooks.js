const { TOKEN } = require("../config/blockcypher");
const { CoinData } = require("../config/coinData");
const axios = require("axios");

export function getTokenDets(TOKEN) {
  return axios.get(`https://api.blockcypher.com/v1/tokens/${TOKEN}`);
}

export function createWebhook({ addr, targetURL, coin, event }) {
  const EventObj = {
    event,
    address: addr,
    url: targetURL,
    signkey: "preset",
  };

  const { COIN, NETWORK } = CoinData[coin];

  return axios.post(
    `https://api.blockcypher.com/v1/${COIN}/${NETWORK}/hooks?token=${TOKEN}`,
    EventObj
  );
}

export function getWebhooksByCoin(coin) {
  const { COIN, NETWORK } = CoinData[coin];
  return axios
    .get(
      `https://api.blockcypher.com/v1/${COIN}/${NETWORK}/hooks?token=${TOKEN}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Error fetching coin webhook data", err);
      throw err;
    });
}

export function deleteWebhookByID({ id, coin }) {
  const { COIN, NETWORK } = CoinData[coin];
  return axios
    .delete(
      `https://api.blockcypher.com/v1/${COIN}/${NETWORK}/hooks/${id}?token=${TOKEN}`
    )
    .then((res) => {
      console.log(`Webhook ${id} deleted successfully`, res);
      return res;
    })
    .catch((err) => {
      console.log(`Error Deleting webhook ${id}`, err);
      throw err;
    });
}
