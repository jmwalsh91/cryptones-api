import type { TypedRequestBody, TypedResponse } from "./types/interfaces";
import routerOhlcv from "./controllers/ohlcv";
import { initServer } from "./utils/server";


//initialize server, accepts no args
//TODO: additional config in initServer function
const app = initServer()

//Index route: format for consistent implementation of interface and type. 
//TODO: Interfaces for response shape, abstract response validation from interface for each endpoint.
app.get("/", (req: {} , res:TypedResponse<{response: string}>) => res.json({"response" : "This is a response"}));

//Routes
app.use('/api/ohclv', routerOhlcv)

const port = process.env.PORT || 8080

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`running. listening on port ${port}`))
}


export default app 