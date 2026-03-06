import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../exceptions/badRequestException.js";
import { NotFoundException } from "../exceptions/notFoundRequest.js";
import { prisma } from "../server.js";

export const getAllResumes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allResumes = await prisma.resume.findMany();
    res.status(200).send(allResumes);
  } catch (error) {
    next(error);
  }
};

export const getListIds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allResumes = await prisma.resume.findMany({
      select: { id: true, resume: true },
    });
    res.status(200).send(
      allResumes.map(({ resume, id }) => {
        const resumeObject = resume as Prisma.JsonObject;
        return { id, title: resumeObject.resume_title };
      })
    );
  } catch (error) {
    next(error);
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

    if (!response) {
      return next(new NotFoundException("Resume not found."));
    }

    const resumeObj = response.resume as Prisma.JsonObject;
    res.status(200).send({ ...resumeObj, id: response.id });
  } catch (error) {
    next(error);
  }
};

export const createResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resume = await prisma.resume.create({
      data: {
        resume: req.body,
      },
    });

    res
      .status(201)
      .send({ message: `Successfully added resume`, id: resume.id });
  } catch (error) {
    next(error);
  }
};

export const updateResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return next(new NotFoundException("Resume not found."));
    }
    next(error);
  }
};

export const deleteResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return next(new NotFoundException("Resume not found."));
    }
    next(error);
  }
};
