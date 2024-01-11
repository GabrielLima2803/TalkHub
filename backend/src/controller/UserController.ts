import { UserService } from './../services/UserService';
import { Response, Request } from 'express';  

export namespace UserController {
    export class CreateUserController {
        async handle(req: Request, res: Response) {
            const { username, email, password } = req.body;

            const createUser = new UserService.CreateUserService();

            try {
                const result = await createUser.execute({ username, email, password });

                return res.status(201).json(result);
            } catch (error) {
                return res.status(500).json({ error: 'Erro ao criar usuário' });
            }
        }
    }
}
