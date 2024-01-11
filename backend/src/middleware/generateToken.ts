import jwt from 'jsonwebtoken';
import { AppError } from '../error/AppError';

export function generateToken(userId:number, secret:string){

    try {
    return jwt.sign({id: userId}, secret);
        
    } catch (error) {
        console.error(error)
        throw new AppError("Erro ao gerar o token:")
    }
}
