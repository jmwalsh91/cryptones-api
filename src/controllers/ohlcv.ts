import express  from "express";


const router = express.Router()

router.get('/base', (req, res, err) => {
    return req? res.send('test') : res.send('null')
})