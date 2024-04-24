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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResume = exports.updateResume = exports.createResume = exports.getSingleResume = exports.getListIds = exports.getAllResumes = void 0;
const badRequestException_js_1 = require("../exceptions/badRequestException.js");
const notFoundRequest_js_1 = require("../exceptions/notFoundRequest.js");
const server_js_1 = require("../server.js");
const getAllResumes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allResumes = yield server_js_1.prisma.resume.findMany();
    res.status(200).send(allResumes);
});
exports.getAllResumes = getAllResumes;
const getListIds = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getListIds");
    try {
        const allResumes = yield server_js_1.prisma.resume.findMany();
        res.status(200).send(allResumes.map(({ resume, id }) => {
            const resumeObject = resume;
            return { id, title: resumeObject.resume_title };
        }));
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.getListIds = getListIds;
const getSingleResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_js_1.prisma.resume.findUnique({
        where: { id: req.params.id },
    });
    if (!response) {
        return next(new notFoundRequest_js_1.NotFoundException("Resume not found."));
    }
    const resumeObj = response === null || response === void 0 ? void 0 : response.resume;
    res.status(200).send(Object.assign(Object.assign({}, resumeObj), { id: response === null || response === void 0 ? void 0 : response.id }));
});
exports.getSingleResume = getSingleResume;
const createResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield server_js_1.prisma.resume.create({
            data: {
                resume: req.body,
            },
        });
        if (!resume) {
            return next(new badRequestException_js_1.BadRequestException("Something went wrong! Resume was not created."));
        }
        res
            .status(200)
            .send({ message: `Successfully added resume`, id: resume.id });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.createResume = createResume;
const updateResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield server_js_1.prisma.resume.update({
            data: {
                resume: req.body,
            },
            where: {
                id: req.params.id,
            },
        });
        if (!resume) {
            return next(new notFoundRequest_js_1.NotFoundException("Resume not found."));
        }
        res
            .status(200)
            .send({ message: `Successfully updated resume`, id: resume.id });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
exports.updateResume = updateResume;
const deleteResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield server_js_1.prisma.resume.delete({
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
});
exports.deleteResume = deleteResume;
