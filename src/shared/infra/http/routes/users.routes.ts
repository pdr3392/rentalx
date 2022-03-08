import { UpdateUserAvatarController } from "@modules/accounts/updateUserAvatar/UpdateUserAvatarController";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ensuredAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

const usersRoutes = Router();

const createUserController = new CreateUserController();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensuredAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
