"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const prisma = new client_1.PrismaClient();
const port = 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
const whitelist = ["http://localhost:3000"]; // assuming front-end application is running on localhost port 3000
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
app.use((0, cors_1.default)(corsOptions));
app.get("/resumes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allResumes = yield prisma.resume.findMany();
        res.status(200).send(allResumes);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
app.get("/resumes/list_ids", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allResumes = yield prisma.resume.findMany();
        res.status(200).send(allResumes.map(({ resume, id }) => {
            const resumeObject = resume;
            return { id, title: resumeObject.resume_title };
        }));
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
app.get("/resumes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.resume.findUnique({
            where: { id: req.params.id },
        });
        const resumeObj = response === null || response === void 0 ? void 0 : response.resume;
        res.status(200).send(Object.assign(Object.assign({}, resumeObj), { id: response === null || response === void 0 ? void 0 : response.id }));
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
app.post("/resumes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield prisma.resume.create({
            data: {
                resume: req.body,
            },
        });
        res
            .status(200)
            .send({ message: `Successfully added resume`, id: resume.id });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
app.patch("/resumes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield prisma.resume.update({
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
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
app.delete("/resumes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield prisma.resume.delete({
            where: {
                id: req.params.id,
            },
        });
        res
            .status(200)
            .send({ message: `Successfully deleted resume`, id: resume.id });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
app.listen(port, () => console.log(`Server has started on port ${port}`));
