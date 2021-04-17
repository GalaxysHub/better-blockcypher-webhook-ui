const { TOKEN } = require("../config/blockcypher");
const { CoinData } = require("../config/coinData");
const MockData = require("../config/mockData");

const axios = require("axios");

const proxyURL = "https://thingproxy.freeboard.io/fetch/";

export function getTokenDets(TOKEN) {
  return axios.get(`${proxyURL}https://api.blockcypher.com/v1/tokens/${TOKEN}`);
}

export function createWebhook({ addr, targetURL, coin, event }) {
  if (!TOKEN) {
    return mockRequest(function () {
      return {
        data: {
          id: "mock-response-" + Date.now(),
          address: addr,
          url: targetURL,
          event: event,
          callback_errors: 0,
        },
      };
    });
  }

  const EventObj = {
    event,
    address: addr,
    url: targetURL,
    signkey: "preset",
  };

  const { COIN, NETWORK } = CoinData[coin];

  return axios.post(
    `${proxyURL}https://api.blockcypher.com/v1/${COIN}/${NETWORK}/hooks?token=${TOKEN}`,
    EventObj
  );
}

export function getWebhooksByCoin(coin) {
  if (!TOKEN) return mockRequest(() => MockData[coin]);

  const { COIN, NETWORK } = CoinData[coin];
  return axios
    .get(
      `${proxyURL}https://api.blockcypher.com/v1/${COIN}/${NETWORK}/hooks?token=${TOKEN}`
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
  if (!TOKEN) return mockRequest();

  const { COIN, NETWORK } = CoinData[coin];
  return axios
    .delete(
      `${proxyURL}https://api.blockcypher.com/v1/${COIN}/${NETWORK}/hooks/${id}?token=${TOKEN}`
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

const mockRequest = (cb = () => {}) => {
  let randWait = Math.random() * 100 + 200;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cb());
    }, randWait);
  });
};
