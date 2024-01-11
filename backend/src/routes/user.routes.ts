import { Router } from "express";
import { UserController } from "../controller/UserController";


const createUser = new UserController.CreateUserController();

const userRoutes = Router();

userRoutes.post("/register", createUser.handle);

export {userRoutes}