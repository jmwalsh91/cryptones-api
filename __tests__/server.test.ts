import { isExportDeclaration } from "typescript";
import { initServer } from "../src/utils/server";

describe("initServer function", () => {
it("returns an instance of express", () => {
    let app = initServer()
    expect(app).toBeTruthy()
})
})