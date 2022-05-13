import express  from "express";


const routerOhlcv = express.Router()

routerOhlcv.get('/base', (req, res, err) => {
    return req? res.send('test') : res.send('null')
})

 export default routerOhlcv
