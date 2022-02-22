import { Router } from "express";
import { createSpecificationsController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) => {
  return createSpecificationsController.handle(req, res);
});

export { specificationsRoutes };
