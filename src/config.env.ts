import dotenv from 'dotenv';
dotenv.config();


interface DBI {
    [key: string]: string;
}

class dBConnection {

    NODE_ENV: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;

    constructor() {
        this.NODE_ENV = process.env.NODE_ENV ? 
            ( process.env.NODE_ENV ).trim().toLowerCase() : 'development';

        const DB: DBI = {
            test: 'TEST',
            development: 'DEV',
            production: 'PRD',
        }

        this.DB_HOST = process.env[`${DB[this.NODE_ENV]}_HOST`]!;
        this.DB_NAME = process.env[`${DB[this.NODE_ENV]}_NAME`]!;
        this.DB_USER = process.env[`${DB[this.NODE_ENV]}_USER`]!;
        this.DB_PASSWORD = process.env[`${DB[this.NODE_ENV]}_PASSWORD`]!;   
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