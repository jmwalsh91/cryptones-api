import app from '../src/app';
const request = require("supertest")

describe('/', () => {
    it("ohlcv router is hit", async () => {
        const res = await request(app)
        .get("/api/ohlcv")
        .expect('Content-Type', "text/html; charset=utf-8")

    }, 1000)
})
