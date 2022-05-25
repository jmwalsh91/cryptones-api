import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ohlcvResponse } from "../types/interfaces";
import {
  formatDate,
  getVolumeArrayFromOhlcv,
  reshapeObject,
} from "../utils/reshape";
import { validateInterval, validateSymbol } from "../utils/validate";
const _ = require("lodash");

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
  return data;
  //TODO: CATCH
};

//OHLCV w/ PARAMS
export const getParamsOhclv = async (symbol: string, interval: string) => {
  //validate params
  const validSymbol: Promise<boolean> = validateSymbol(symbol);
  const validInterval: Promise<boolean> = validateInterval(interval);

  //if symbol is included in validSymbols array (returns true) and interval is included in validInterval array (returns true), use as query params for .get() to alphavantage. 
  const data = await Promise.all([validSymbol, validInterval]).then(async () => {
    const data: AxiosResponse = await alphavantage
      .get("", {
        params: {
          symbol: `${symbol}`,
          market: "USD",
          interval: `${interval}`,
          apikey: alphaKey,
        },
      })
      .then((data) => {
        return data;
      });
    return data;
  });
  return data 
  //TODO: CATCH
};

//intercepts response from API and reshapes response so that data can be utilized in the client with minimal operations
//TODO: HANDLE ERRORS
alphavantage.interceptors.response.use(async (response) => {
  console.log("interceptor");
  //cull meta fro mresponse object
  let target = response.data["Time Series Crypto (5min)"];
  //transform each date from string with Date.parse(), return array of numbers
  let formattedDate: number[] = formatDate(target);
  //reshape data so that it is consumable by chart library in client
  let objectValues: object[] = reshapeObject(target);
  //remove volume from objectValues and return volume array
  let volumeArray: number[] = getVolumeArrayFromOhlcv(objectValues);
  //package date array alongside objectValues, return array of arrays w/ shape: [number, array [strings]]
  let formattedOhlc: any[][] = _.zip(formattedDate, objectValues);
  //Package Ohlc data and volume together in object that conforms to specified interface
  let formattedData: ohlcvResponse = { formattedOhlc, volumeArray };
  //Hand it over to the client
  return formattedData;
});
