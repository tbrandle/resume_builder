// const request =  require("supertest");
import request from "supertest";
import { promisify } from "util";
import app  from "../server.js";
import prisma from "./helpers/prisma.js";

describe("HTTP requests for resumes", () => {

  it("should post a resume", async () => {
    // const { status, body } = await request(app)
    //   .post("/resumes")
    //   .send({
    //     resume_title: "Tim",
    //     social_media: "Tim",
    //     skills: "Tim",
    //     employment_history: "Tim",
    //     education: "Tim",
    //   });
      prisma.resume
      const newResume = await prisma.resume.findFirst();
      console.log({newResume});

      expect(status).toBe(200);
  })
  it("get all resumes", async () => {
    await request(app).get("/resumes").expect(200);
  });

});
