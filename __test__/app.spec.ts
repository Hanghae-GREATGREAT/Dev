import request from 'supertest';
import app from '../src/app';
import sequelize from '../src/db/config/connection';
import association from '../src/db/config/associate';


describe('app module test', () => {
    const OLD_ENV = process.env;

    beforeAll(async()=>{
        await sequelize.authenticate();
        association();
    });

    beforeEach(()=>{
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });

    afterAll(async()=>{
        process.env = OLD_ENV;
        await sequelize.close();
    });

    test('should return status 200, if success', async() => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
    });
});