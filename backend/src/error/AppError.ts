export class AppError {
    public readonly messege: string;

    public readonly statusCode:number;

    constructor(messege:string, statusCode = 400){
        this.messege = messege;
        this.statusCode = statusCode;
    }
}