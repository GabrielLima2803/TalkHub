import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from './error/AppError';
import { routes } from './routes';
import http from 'http';
import { SocketManager } from './socket/socketManager';

const app = express();
const PORT = 3000;

const server = http.createServer(app);


app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: `Erro interno no servidor - ${err.message}`,
    });
});

const socketManager = new SocketManager(server);
app.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`));
