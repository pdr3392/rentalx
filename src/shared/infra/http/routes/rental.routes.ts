import Router from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensuredAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensuredAuthenticated,
  devolutionRentalController.handle
);
rentalRoutes.get(
  "/user",
  ensuredAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };
