import { Router } from 'express'
import * as ResumeController from '../controllers/resumes';

const resumeRoutes:Router = Router();

resumeRoutes.get("/", ResumeController.getAllResumes);

resumeRoutes.get("/list_ids", ResumeController.getListIds);

resumeRoutes.get("/:id", ResumeController.getSingleResume);

resumeRoutes.post("", ResumeController.createResume);

resumeRoutes.patch("/:id", ResumeController.updateResume);

resumeRoutes.delete("/:id", ResumeController.deleteResume);

export default resumeRoutes;