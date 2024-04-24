import express from "express";
import { Prisma } from "@prisma/client";
import cors from 'cors';
import { errorMiddleware } from "./middlewares/errors";
// const rootRouter = require("./routes");
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query']
});

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api', rootRouter)
app.use(errorMiddleware);

app.listen(process.env.PORT, () =>
  console.log(`Server has started on port ${process.env.PORT}`)
);
