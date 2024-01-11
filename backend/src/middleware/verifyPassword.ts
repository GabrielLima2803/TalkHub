import argon2 from 'argon2';
import { AppError } from '../error/AppError';

export async function verifyPassword(hash:any, password:string) {
    try {
        return await argon2.verify(hash, password);
    } catch (error) {
        console.error('Erro ao verificar a senha:', error);
        throw new AppError('Erro interno ao verificar a senha.');
    }
}