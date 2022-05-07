import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import upload from "@config/upload";
import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";
import db from "@shared/infra/typeorm";

import "@shared/container";

import swaggerFile from "../../../swagger.json";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const database = db();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error -> ${err.message}`,
  });
});

export { app };
