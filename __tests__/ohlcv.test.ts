import app from '../src/app';
import request from "supertest"

//Tests for ohlcv route
describe('/', () => {
    //that the route is hit, and returns a response with "txt/html" content type
    it("ohlcv router is hit", async () => {
        const res = await request(app)
        .get("/api/ohlcv")
        .expect('Content-Type', "text/html; charset=utf-8")
    }, 1000)
})
