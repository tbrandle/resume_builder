"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// const rootRouter = require("./routes");
const routes_1 = __importDefault(require("./routes"));
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient({
    log: ['query']
});
const whitelist = ["http://localhost:3000"];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use('/api', routes_1.default);
// app.use(errorMiddleware);
app.listen(process.env.PORT, () => console.log(`Server has started on port ${process.env.PORT}`));
