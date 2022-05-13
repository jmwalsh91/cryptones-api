import app from '../src/app';
import request from 'supertest'

describe('/', () => {
    it("ohlcv router is hit", async () => {
        const res = await request(app)
        .get("/api/ohlcv")
        .send({request: "hello"});

        expect(res.body).toStrictEqual({})

    }, 1000)
})
