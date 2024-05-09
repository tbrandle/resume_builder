import express, {Router} from "express";
import resumeRoutes from "./resumes";


const rootRouter: Router = express.Router();
rootRouter.use('/resumes', resumeRoutes)

export default rootRouter;