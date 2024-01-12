import { User } from "@prisma/client";
import argon2 from 'argon2';
import { isValidEmail } from "../middleware/isValidEmail";
import { prisma } from "../prisma/client";
import { AppError } from "../error/AppError";
import { promises as fs } from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { UserDTO } from '../dtos/UserDTO';

export namespace UserService {
  
  export class CreateUserService {
    async execute({ username, email, password }: UserDTO): Promise<User> {
      if (!isValidEmail(email)) {
        throw new AppError("E-mail inválido");
      }

      const userExist = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

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
    }
  }

  export class GetAllUsers {
    async execute(): Promise<User[]> {
      const users = await prisma.user.findMany();
      return users;
    }
  }

  export class ForgetPasswordService {
    async execute({ email }: { email: string }) {
      if (!isValidEmail(email)) {
        throw new AppError("E-mail inválido");
      }
  
      const userExist = await prisma.user.findUnique({
        where: {
          email: email
        }
      });
  
      if (!userExist) {
        throw new AppError("Usuário não encontrado");
      }
  
      const code: string = Math.floor(100000 + Math.random() * 900000).toString();
      const expiration = new Date();  
      expiration.setMinutes(expiration.getMinutes() + 15); 
  
      const htmlTemplatePath = path.join(__dirname, '../email/email.html');
      const htmlTemplate = await fs.readFile(htmlTemplatePath, 'utf-8');
      const formattedHtml = htmlTemplate.replace('${code}', code);
  
      await prisma.resetCode.create({
        data: {
          code: code,
          expiration: expiration,
          user: {
            connect: { email: email }  
          }
        }
      });
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recuperação de Senha',
        html: formattedHtml,
      };
  
      const info = await transporter.sendMail(mailOptions);
  
      console.log('E-mail enviado:', info.response);
      return { msg: 'E-mail de recuperação de senha enviado com sucesso.' };
    }
  }

  export class UpdatePasswordService {
    async execute({ email, newPassword }: { email: string, newPassword: string }) {
      const hashedPassword = await argon2.hash(newPassword);
  
      await prisma.user.update({
        where: {
          email: email
        },
        data: {
          password: hashedPassword
        }
      });
  
      return { msg: 'Senha atualizada com sucesso.' };
    }
  }

  export class ResetPasswordService {
    async execute({ email, code, newPassword }: { email: string, code: string, newPassword: string }) {
        try {

          const hashedPassword = await argon2.hash(newPassword);
            const resetCode = await prisma.resetCode.findFirst({
                where: {
                    code,
                    expiration: { gt: new Date() }
                },
                include: {
                    user: {
                        select: {
                            email: true
                        }
                    }
                }
            });

            if (resetCode && resetCode.user?.email === email) {
                await prisma.user.update({
                    where: { email },
                    data: { password: hashedPassword }
                });

                await prisma.resetCode.deleteMany({
                    where: { code }
                });

                return { msg: 'Senha redefinida com sucesso.' };
            } else {
                return { error: 'Código inválido ou expirado.' };
            }
        } catch (error) {
            console.error('Erro ao redefinir a senha:', error);
            return { error: 'Erro interno ao redefinir a senha.' };
        }
    }
}

}
