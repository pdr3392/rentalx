import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/createSpecificationController";
import { Router } from "express";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationController();

specificationsRoutes.use(ensuredAuthenticated);

specificationsRoutes.post("/", createSpecificationsController.handle);

export { specificationsRoutes };
