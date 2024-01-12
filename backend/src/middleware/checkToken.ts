import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: JwtPayload;
}

function checkToken(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado, faça o login para acessar essa rota' });
  }

  try {
    const secret = process.env.SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    console.log(decoded);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: 'Token inválido' });
  }
}

export default checkToken;
