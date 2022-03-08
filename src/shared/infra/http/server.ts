import express from "express";
import swaggerUi from "swagger-ui-express";
import { Request, Response, NextFunction } from "express";
import "express-async-errors";

import db from "@shared/infra/typeorm";

import "@shared/container";

import { router } from "@shared/infra/http/routes";

import swaggerFile from "../../../swagger.json";
import { AppError } from "@shared/errors/AppError";

const database = db();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(200).json({ message: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(3333, () => console.log("Server is running!"));
