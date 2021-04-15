const { TOKEN } = require("../config/blockcypher");
const { CoinData } = require("../config/coinData");
const axios = require("axios");

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

export function createTXConfirmationWebhook(addr, targetURL, coin) {
  return createWebhook(addr, targetURL, coin, "tx-confirmation");
}

export function createUnconfirmedTXWebhook(addr, targetURL, coin) {
  return createWebhook(addr, targetURL, coin, "unconfirmed-tx");
}

export async function createConfirmedTXWebhook(addr, targetURL, coin) {
  return createWebhook(addr, targetURL, coin, "confirmed-tx");
}

export function getWebhooksByCoin(coin) {
  const { COIN, NETWORK } = CoinData[coin];
  return axios
    .get(
      `https://api.blockcypher.com/v1/${COIN}/${NETWORK}/hooks?token=${TOKEN}`
    )
    .then((res) => {
      console.log("webhooks", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("Error fetching coin webhook data", err);
      throw err;
    });
}

export function getWebhookByID({ id, coin }) {
  const { COIN, NETWORK } = CoinData[coin];
  return axios.get(
    `https://api.blockcypher.com/v1/${COIN}/${NETWORK}/hooks/${id}?token=${TOKEN}`
  );
}

export function deleteWebhookByID({ id, coin }) {
  const { COIN, NETWORK } = CoinData[coin];
  return axios
    .delete(
      `https://api.blockcypher.com/v1/${COIN}/${NETWORK}/hooks/${id}?token=${TOKEN}`
    )
    .then((res) => {
      console.log("web hook deleted successfully");
      return res;
    })
    .catch((err) => {
      console.log("err", err);
      throw err;
    });
}
