import dotenv from 'dotenv';
dotenv.config();


class dBConnection {

    NODE_ENV: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;

    constructor() {
        this.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
        this.DB_HOST = process.env.DB_HOST!;
        this.DB_NAME = process.env.DB_NAME!;
        this.DB_USER = process.env.DB_USER!;
        this.DB_PASSWORD = process.env.DB_PASSWORD!;        
    }
}


class Env extends dBConnection {

    PORT: number;

    constructor() {
        super();

        this.PORT = Number(process.env.PORT);
    }
}


export default new Env();