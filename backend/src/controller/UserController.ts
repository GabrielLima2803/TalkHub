import { AppError } from '../error/AppError';
import { generateToken } from '../middleware/generateToken';
import { verifyPassword } from '../middleware/verifyPassword';
import { prisma } from '../prisma/client';
import { UserService } from './../services/UserService';
import { Response, Request } from 'express';  

export namespace UserController {
    export class CreateUserController {
        async handle(req: Request, res: Response) {
            const { username, email, password, confirmPassword } = req.body;

            if (password !== confirmPassword) {
                throw new AppError("As senhas não conferem!")
            }
            const createUser = new UserService.CreateUserService();
            const result = await createUser.execute({ username, email, password });
            return res.status(201).json(result);
        }
    }

    export class AuthUserController {
        async handle(req: Request, res: Response) {
            const { identifier, password } = req.body;
    
            if (!identifier) {
                return res.status(422).json({ msg: "O e-mail ou nome de usuário é obrigatório!" });
            }
    
            if (!password) {
                return res.status(422).json({ msg: "A senha é obrigatória!" });
            }
    
            try {
                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            {
                                email: identifier,
                            },
                            {
                                username: identifier,
                            },
                        ],
                    },
                });
    
                if (!user) {
                    return res.status(404).json({ msg: 'Usuário não encontrado' });
                }
    
                const checkPassword = await verifyPassword(user.password, password);
    
                if (!checkPassword) {
                    return res.status(422).json({ msg: 'Senha inválida' });
                }
    
                const secret = process.env.SECRET || 'secretinho';
                const token = generateToken(user.id, secret);
    
                res.status(201).json({
                    msg: 'Usuário logado com sucesso',
                    token,
                    user: { id: user.id, username: user.username, email: user.email },
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ msg: 'Erro interno do servidor' });
            }
        }
    }

    export class GetAllUsersController {
        async handle(req: Request, res: Response) {
          const getAllUsers = new UserService.GetAllUsers();
          const result = await getAllUsers.execute();
          return res.status(200).json(result);
        }
      }
}
