import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { response } from "express";
import { isError } from "lodash";
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
    const data = await alphavantage
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
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          return response.status(500).send(AxiosError) 
        } else {
          return response.send(error)
        }
        
      });
    return data;
  });
  return data 
};

//intercepts response from API and reshapes response so that data can be utilized in the client with minimal operations
//TODO: HANDLE ERRORS
//TODO: EXCHANGE CURRENCY PARAM, REFRESH TIME
interface ErrorStatus {
  reason: string
  err: number
}
alphavantage.interceptors.response.use(async (response) => {
  if (!response.data['Meta Data']['3. Digital Currency Name']) {
    let errorRes: ErrorStatus = {
      reason: response.statusText,
      err: response.status
    }
    return errorRes
  } else {
  //get cryptocurrency name to label chart in client, TODO: validate UI consistency in client
  let tokenName: string = response.data['Meta Data']['3. Digital Currency Name']
  //get interval to access time series crypto property of response object / cull meta data
  let interval: string = response.data['Meta Data']['7. Interval']
  //cull metadata from response object
  let target: object[] = response.data[`Time Series Crypto (${interval})`]
  //transform each date from string with Date.parse(), return array of numbers
  let formattedDate: number[] = formatDate(target);
  //reshape data so that it is consumable by chart library in client
  let objectValues: object[] = reshapeObject(target);
  //remove volume from objectValues and return volume array
  let volumeArray: number[] = getVolumeArrayFromOhlcv(objectValues);
  //package date array alongside objectValues, return array of arrays w/ shape: [number, array [strings]]
  let formattedOhlc: any[][] = _.zip(formattedDate, objectValues);
  //Package Ohlc data and volume together in object that conforms to specified interface
  let formattedData: ohlcvResponse = { tokenName, interval, formattedOhlc, volumeArray };
  //Hand it over to the client
  return formattedData;
  }
});
