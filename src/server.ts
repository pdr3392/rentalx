import express from "express";
import swaggerUi from "swagger-ui-express";
import db from "./database";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const database = db();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running!"));
