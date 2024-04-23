// const request =  require("supertest");
import request from "supertest";
import app from "../server.js";
describe("HTTP requests for resumes", () => {
    it("get all resumes", async () => {
        await request(app).get("/resumes").expect(200);
    });
});
