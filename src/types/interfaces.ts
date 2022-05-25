import * as core from 'express-serve-static-core'
import type { Send } from 'express-serve-static-core'

export interface Params extends core.ParamsDictionary{}
export interface RequestParams extends Params {
    symbol: string
    interval: string
  }
  
  
export interface TypedRequestBody<T> extends Express.Request {
    body: T
    params?: RequestParams
}

export interface TypedResponse<ResBody> extends Express.Response {
   send: Send<ResBody, this>;
}

export interface ohlcvResponse {
    volumeArray: number[] 
    formattedOhlc: any[][]
}