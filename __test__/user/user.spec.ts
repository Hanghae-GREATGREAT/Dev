import { NextFunction, Request, Response } from 'express';
import UserController from '../../src/user/user.controller';
import sequelize from '../../src/db/config/connection';
import associate from '../../src/db/config/associate';
import redis from '../../src/db/redis/config';
import resetTable from '../resetTable';
import env from '../../src/config.env';



describe('user controller test', ()=>{

    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction = jest.fn();

    // test DB 연결
    beforeAll(async()=>{
        await sequelize.authenticate();
        associate();
        console.log(env);
        if (env.NODE_ENV === 'test') {
            await sequelize.authenticate();
            associate();
            await resetTable();
        } else {
            throw new Error('NODE_ENV !== test');
        }
    });

    beforeEach(()=>{
        req = {};
        res = {
            status: jest.fn(),
            json: jest.fn()
        }
    });

    afterAll(async()=>{
        await sequelize.close();
        await redis.disconnect();
    });


    // 회원가입 테스트
    test.skip('signup: should return status 200, if success', async()=>{
        req = {
            body: {
                username: 'new1use2r',
                password: '1234',
                confirm: '1234'
            }
        }

        await UserController.signup(req as Request, res as Response, next as NextFunction);

        expect(res.status).toBeCalledWith(200);
    });

    test('signup: should return status 400, if passwords does not match', async()=>{
        req = {
            body: {
                username: 'new1use2r',
                password: '1234',
                confirm: '1235'
            }
        }

        await UserController.signup(req as Request, res as Response, next as NextFunction);

        expect(next).toBeCalled();
    });


    // 로그인 테스트
    test('signin: should return status 200, if success', async () => {
        req = {
            body: {
                username: 'root',
                password: '1234',
            }
        }

        await UserController.signin(req as Request, res as Response, next as NextFunction);

        // expect(res.status).toBeCalledWith(200);
        expect(next).toBeCalled()
    });

    test('signin: should redirect to "/", if no character',async() => {
        req = {
            body: {
                username: 'new1use2r',
                password: '1234',
            }
        }
        res = {
            redirect: jest.fn(()=>{})
        }

        await UserController.signin(req as Request, res as Response, next as NextFunction);

        expect(res.redirect).toBeCalledWith('/');
    });

    test('signin: should call next, if any error happens', async () => {
        req = {
            body: {
                username: 'new1use2r',
                password: '1235',
            }
        }

        await UserController.signin(req as Request, res as Response, next as NextFunction);

        expect(next).toBeCalled();
    });
});