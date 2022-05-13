import axios, { AxiosInstance, AxiosResponse } from "axios";
const alphaKey = process.env.APIKEY;

//Axios instance for querying alphavantage api
const alphavantage: AxiosInstance = axios.create({
  baseURL: "https://www.alphavantage.co/query?function=CRYPTO_INTRADAY",
  timeout: 10000,
});

//get "open high close low volume"
//TODO: interface for params object
//TODO: also in /controllers/ohlcv: interceptor and interface for interceptor's return 
export const getOhclv = async () => {
  console.log(alphaKey);

  const data: AxiosResponse = await alphavantage
    .get("", {
      params: {
        symbol: "BTC",
        market: "USD",
        interval: "5min",
        apikey: alphaKey,
      },
    })
    .then((data) => {
      console.log(data.data);
      return data;
    });
  //TODO: CATCH
};
