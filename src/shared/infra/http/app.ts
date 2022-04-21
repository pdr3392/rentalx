import "reflect-metadata";
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import "express-async-errors";

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

app.use(router);

app.use((err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    return res.status(200).json({ message: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

export { app };