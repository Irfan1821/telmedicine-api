import express from "express";
// import * as userController from "../controllers/userController.js";
import {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserWithEmail,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getAllUser).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

router.route("/get-user-info").post(getUserWithEmail);

export default router;
