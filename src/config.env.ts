import dotenv from 'dotenv';

dotenv.config();


class Env {
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    PORT: number;
    DB_HOST: string;

    constructor() {
        this.PORT = Number(process.env.PORT);

        this.DB_HOST = process.env.DB_HOST!;
        this.DB_NAME = process.env.DB_NAME!;
        this.DB_USER = process.env.DB_USER!;
        this.DB_PASSWORD = process.env.DB_PASSWORD!;
    }
}


export default new Env();