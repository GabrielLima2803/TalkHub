import "express-async-errors";
import {AppError} from "./error/AppError"
import express, { NextFunction, Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((err: Error, request: Request, response: Response, next: NextFunction) =>{
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }
    return response.status(500).json({
        status: "error",
        message: `Error Interno no servidor - ${err.message}`
    })
})



app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`));