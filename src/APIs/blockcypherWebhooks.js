import { CoinData } from "_config/coinData.json";
import mockWebhooks from "__mock__/webhooks.json";
import mockTokenDets from "__mock__/tokenDets.json";

import axios from "axios";

const proxyURL = "https://thingproxy.freeboard.io/fetch/";

const isLocalhost = () => {
  return window.location.hostname === "localhost" || 
         window.location.hostname === "127.0.0.1" ||
         window.location.hostname === "::1";
};

const getBaseURL = (url) => {
  return isLocalhost() ? `${proxyURL}${url}` : url;
};

export function getTokenDets(TOKEN) {
  if (!TOKEN) {
    return mockRequest(() => {
      return { data: mockTokenDets };
    });
  }

  return axios.get(getBaseURL(`https://api.blockcypher.com/v1/tokens/${TOKEN}`));
}

export function createWebhook({ addr, targetURL, coin, event, token }) {
  if (!token) {
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
    getBaseURL(`https://api.blockcypher.com/v1/${COIN}/${NETWORK}/hooks?token=${token}`),
    EventObj
  );
}

export function getWebhooksByCoin(coin, token) {
  if (!token) return mockRequest(() => mockWebhooks[coin]);

  const { COIN, NETWORK } = CoinData[coin];
  return axios
    .get(
      getBaseURL(`https://api.blockcypher.com/v1/${COIN}/${NETWORK}/hooks?token=${token}`)
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Error fetching coin webhook data", err);
      throw err;
    });
}

export function deleteWebhookByID({ id, coin, token }) {
  if (!token) return mockRequest();

  const { COIN, NETWORK } = CoinData[coin];
  return axios
    .delete(
      getBaseURL(`https://api.blockcypher.com/v1/${COIN}/${NETWORK}/hooks/${id}?token=${token}`)
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
