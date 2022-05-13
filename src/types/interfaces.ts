import { isExpressionStatement } from "typescript"
import type { Send } from 'express-serve-static-core'

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}

export interface TypedResponse<ResBody> extends Express.Response {
   json: Send<ResBody, this>;
}