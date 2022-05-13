
import axios, { AxiosInstance } from "axios";


const alphavantage: AxiosInstance = axios.create({
    baseURL: 'https://www.alphavantage.co/query?function=CRYPTO_INTRADAY',
    timeout: 10000,
  });