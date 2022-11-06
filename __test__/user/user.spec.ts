import { NextFunction, Request, Response } from 'express';
import UserController from '../../src/user/user.controller';
import sequelize from '../../src/db/config/connection';
import associate from '../../src/db/config/associate';
import resetTable from '../resetTable';
import env from '../../src/config.env';



describe('user controller test', ()=>{

    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction = jest.fn();

    // // test DB 연결
    // beforeAll(async()=>{
    //     await sequelize.authenticate();
    //     associate();
    //     await resetTable();
    //     // if (env.NODE_ENV === 'test') {
    //     //     await sequelize.authenticate();
    //     //     associate();
    //     //     await resetTable();
    //     // } else {
    //     //     throw new Error('NODE_ENV !== test');
    //     // }
    // });

    beforeEach(()=>{
        req = {};
        res = {
            status: jest.fn(),
            json: jest.fn()
        }
    });

    // afterAll(async()=>{
    //     await sequelize.close();
    // });


    // 회원가입 테스트
    test('should return status 200, if success', async()=>{
        req = {
            body: {
                username: 'root',
                password: '1234',
                confirm: '1234'
            }
        }

        await UserController.signup(req as Request, res as Response, next as NextFunction);

        expect(res.status).toBeCalledWith(200);
    });

    test('should return status 400, if passwords does not match', async()=>{
        req = {
            body: {
                username: 'root',
                password: '1234',
                confirm: '1235'
            }
        }

        await UserController.signup(req as Request, res as Response, next as NextFunction);

        expect(next).toBeCalled();
    });


    // 로그인 테스트
});