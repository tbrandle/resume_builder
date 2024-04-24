import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";

export const errorMiddleware = (error:HttpException, req:Request, res:Response, next:NextFunction) => {
  console.log(error.message)
  res.status(error.statusCode).json({
    message: error.message,
    errors: error.errors
  })
}