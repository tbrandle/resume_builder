import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../server.js";

export const getAllResumes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("getAllResumes");

  try {
    const allResumes = await prisma.resume.findMany();
    res.status(200).send(allResumes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getListIds = async (req: Request, res: Response, next: NextFunction) => {
  console.log("getListIds");
  try {
    const allResumes = await prisma.resume.findMany();
    res.status(200).send(
      allResumes.map(({ resume, id }) => {
        const resumeObject = resume as Prisma.JsonObject;
        return { id, title: resumeObject.resume_title };
      })
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getSingleResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await prisma.resume.findUnique({
      where: { id: req.params.id },
    });

    const resumeObj = response?.resume as Prisma.JsonObject;
    res.status(200).send({ ...resumeObj, id: response?.id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};


export const createResume = async (  req: Request,
  res: Response,) => {
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
}
export const updateResume = async (  req: Request,
  res: Response,) => {
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
}
export const deleteResume = async (  req: Request,
  res: Response,) => {
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
}