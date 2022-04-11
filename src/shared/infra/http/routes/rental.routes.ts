import Router from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post("/", ensuredAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensuredAuthenticated,
  devolutionRentalController.handle
);

export { rentalRoutes };
