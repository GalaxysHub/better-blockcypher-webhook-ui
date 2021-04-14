import axios from "axios";
import { TOKEN } from "config/blockcypher";
import { CoinData } from "config/coinData";

function createWebhook(addr, targetURL, coin, event) {
  const EventObj = {
    event,
    address: addr,
    url: targetURL,
    signkey: "preset",
  };

  const { COIN, NETWORK } = CoinData[coin];

  return axios
    .post(
      `https://api.blockcypher.com/v1/${COIN}/${NETWORK}/hooks?token=${TOKEN}`,
      EventObj
    )
    .then((res) => {
      console.log("webhook response data:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("err", err);
      return err;
    });
}

function createTXConfirmationWebhook(addr, targetURL, coin) {
  return createWebhook(addr, targetURL, coin, "tx-confirmation");
}

function createUnconfirmedTXWebhook(addr, targetURL, coin) {
  return createWebhook(addr, targetURL, coin, "unconfirmed-tx");
}

async function createConfirmedTXWebhook(addr, targetURL, coin) {
  return createWebhook(addr, targetURL, coin, "confirmed-tx");
}

function getWebhooksByCoin(coin) {
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
      return err;
    });
}

function getWebhookByID(id, coin) {
  const { COIN, NETWORK } = CoinData[coin];
  return axios
    .get(
      `https://api.blockcypher.com/v1/${COIN}/${NETWORK}/hooks/${id}?token=${TOKEN}`
    )
    .then((res) => {
      console.log("web hook deleted successfully");
      return res;
    })
    .catch((err) => {
      console.log("err", err);
      return err;
    });
}

function deleteWebhookByID(id, coin) {
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
      return err;
    });
}

module.exports = {
  createTXConfirmationWebhook,
  createUnconfirmedTXWebhook,
  createConfirmedTXWebhook,
  createWebhook,
  getWebhooksByCoin,
  getWebhookByID,
  deleteWebhookByID,
};
