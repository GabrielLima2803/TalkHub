import { User } from "@prisma/client";
import { UserDTO } from "../dtos/UserDTO";
import { AppError } from "../error/AppError";
import { prisma } from "../prisma/client";

export class CreateUserService {
    async execute({username, email, password}: UserDTO): Promise<User> {  
        const userExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (userExist) {
            throw new AppError("User já existe");
        }

        const user = prisma.user.create({
            data:{
                username,
                email,
                password
            }
        });

        return user;
    }
}