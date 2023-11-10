import "reflect-metadata";
import express, { Express } from "express";
import {
    Action,
    UnauthorizedError,
    getMetadataArgsStorage,
    useExpressServer,
} from "routing-controllers";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "./middleware/errorHandler";
import { hackathonController } from "./modules/Event/event.controller";
import { teamController } from "./modules/Teams/team.controller";
const app: Express = express();
const PORT = 3000;
app.listen(PORT, async () => {
    console.log("core succesfully start at ", PORT);
});

useExpressServer(app, {
    development: false,
    defaultErrorHandler: false,
    cors: {
        origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:8055",
        ],
        methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
        headers: ["*"],
        credentials: true,
    },
    middlewares: [ErrorHandler],
    routePrefix: "/api",
    controllers: [hackathonController,teamController],
});