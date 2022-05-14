import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  formatDate,
  getVolumeArrayFromOhlcv,
  reshapeObject,
} from "../utils/reshape";
const _ = require("lodash")

const alphaKey = process.env.APIKEY;

//Axios instance for querying alphavantage api
export const alphavantage: AxiosInstance = axios.create({
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
    return data 
  //TODO: CATCH
};

//intercepts response from API and reshapes response so that data can be utilized in the client with minimal operations
//TODO: refactor
alphavantage.interceptors.response.use((response) => {
  console.log("interceptor");
  let target = response.data["Time Series Crypto (5min)"];
  let formattedDate = formatDate(target);
  let objectValues = reshapeObject(target);
  let volumeArray = getVolumeArrayFromOhlcv(objectValues);
  let formattedOhcl = _.zip(formattedDate, objectValues);
  let formattedData = { formattedOhcl, volumeArray }
  
  return formattedData 
});
