import { Request, Response, NextFunction } from 'express';
import UserService from './user.service';
import { SignupForm } from '../interfaces/user'
import { HttpException, HttpStatus } from '../common';


class UserController {

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password, confirm }: SignupForm = req.body;
            if (password !== confirm) {
                throw new HttpException('비밀번호가 일치하지 않습니다', HttpStatus.BAD_REQUEST);
            }

            await UserService.signup({ username, password });
            
            res.status(200);
        } catch (error) {
            next(error);
        }
    };

    async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password }: Pick<SignupForm, 'username' | 'password'> = req.body;

            await UserService.signin({ username, password });

            res.status(200);
        } catch (error) {
            next(error);
        }
    };

    async signout(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;

            await UserService.signout(userId);

            res.status(200);
        } catch (error) {
            next(error);
        }
    };
}


export default new UserController();