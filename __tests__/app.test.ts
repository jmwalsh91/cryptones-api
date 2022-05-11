import app from '../src/app'

import request from 'supertest'
import { JsonableValue } from 'ts-jest';

//api config and index route tests

describe('/', () => {

    it("index route sends response when route is hit", async () => {
        const res = await request(app)
        .post("/")
        .send({request: ""});

        expect(res.body).toStrictEqual({})

    }, 1000)
})