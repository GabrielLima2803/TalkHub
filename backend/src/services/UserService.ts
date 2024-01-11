import { User } from "@prisma/client";
import { UserDTO } from "../dtos/UserDTO";
import { AppError } from "../error/AppError";
import { prisma } from "../prisma/client";
import argon2 from 'argon2';
import { isValidEmail } from "../middleware/isValidEmail";

export namespace UserService {
    
    export class CreateUserService {
      async execute({ username, email, password }: UserDTO): Promise<User> {
        try {
          const userExist = await prisma.user.findUnique({
            where: {
              email: email
            }
          });
          
          if (!isValidEmail(email)) {
            throw new AppError("E-mail inválido");
          }

          if (userExist) {
            throw new AppError("Usuário já existe");
          }
  
          const hashedPassword = await argon2.hash(password);
  
          const user = await prisma.user.create({
            data: {
              username,
              email,
              password: hashedPassword
            }
          });
  
          return user;
        } catch (error) {
          throw error; 
        }
      }
    }
  }
  