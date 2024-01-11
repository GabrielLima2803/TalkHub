import { Router } from "express";
import { UserController } from "../controller/UserController";
import checkToken from "../middleware/checkToken";


const createUser = new UserController.CreateUserController();
const loginUser = new UserController.AuthUserController();
const getAllUsers = new UserController.GetAllUsersController();

const userRoutes = Router();

userRoutes.post("/register", createUser.handle);
userRoutes.post("/login", loginUser.handle);
userRoutes.get("/get-all", checkToken, getAllUsers.handle);

export {userRoutes}