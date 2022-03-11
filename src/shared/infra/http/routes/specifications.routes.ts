import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/createSpecificationController";
import { Router } from "express";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensuredAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  ensuredAuthenticated,
  ensureAdmin,
  createSpecificationsController.handle
);

export { specificationsRoutes };
