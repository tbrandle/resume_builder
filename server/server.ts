import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import cors from 'cors';

const prisma = new PrismaClient();

const port = 8080;

const app = express();
app.use(express.json());

const whitelist = ["http://localhost:3000"]; // assuming front-end application is running on localhost port 3000

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.get("/resumes", async (req, res) => {
  try {
    const allResumes = await prisma.resume.findMany();
    res.status(200).send(allResumes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/resumes/list_ids", async (req, res) => {
  try {
    const allResumes = await prisma.resume.findMany();
    res.status(200).send(allResumes.map(({resume, id}) => { 
      const resumeObject = resume as Prisma.JsonObject
      return { id, title: resumeObject.resume_title };
    }));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/resumes/:id", async (req, res) => {
  try {
    const response = await prisma.resume.findUnique({
      where: { id: req.params.id },
    });

    const resumeObj = response?.resume as Prisma.JsonObject
    res.status(200).send({ ...resumeObj, id: response?.id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/resumes", async (req, res) => {
  try {
    const resume = await prisma.resume.create({
      data: {
        resume: req.body,
      },
    });
    res
      .status(200)
      .send({ message: `Successfully added resume`, id: resume.id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.patch("/resumes/:id", async (req, res) => {
  try {
    const resume = await prisma.resume.update({
      data: {
        resume: req.body,
      },
      where: {
        id: req.params.id,
      },
    });
    res
      .status(200)
      .send({ message: `Successfully updated resume`, id: resume.id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete("/resumes/:id", async (req, res) => {
  try {
    const resume = await prisma.resume.delete({
      where: {
        id: req.params.id,
      },
    });

    res
      .status(200)
      .send({ message: `Successfully deleted resume`, id: resume.id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.listen(port, () => console.log(`Server has started on port ${port}`));
