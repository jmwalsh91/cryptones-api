import axios, { AxiosInstance } from "axios";
const alphaKey = process.env.APIKEY;
//Axios instance for querying alphavantage api
const alphavantage: AxiosInstance = axios.create({
  baseURL: "https://www.alphavantage.co/query?function=CRYPTO_INTRADAY",
  timeout: 10000,
});

export const getOhclv = async () => {
  const data = await alphavantage.get("", {
    params: {
      symbol: "BTC",
      market: "USD",
      interval: "5min",
      apikey: alphaKey,
    },
  })
};
