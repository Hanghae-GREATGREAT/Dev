import { Request, Response, NextFunction } from 'express';
import UserService from './user.service';
import CharacterService from '../character/character.service';
import redis from '../db/redis/config';
import { SignupForm, UserSession } from '../interfaces/user'
import { HttpException, HttpStatus } from '../common';


class UserController {

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password, confirm }: SignupForm = req.body;
            if (password !== confirm) {
                throw new HttpException('비밀번호가 일치하지 않습니다', HttpStatus.BAD_REQUEST);
            }

            await UserService.signup({ username, password });
            
            res.status(200).end();
        } catch (error) {
            next(error);
        }
    };

    async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password }: Pick<SignupForm, 'username' | 'password'> = req.body;
            
            const { userId } = await UserService.signin({ username, password });
            const character = await CharacterService.findOneByUserId(userId);
            if (character === null) {
                return res.redirect('/')// 캐릭터 없음. 리다이렉션?
            }
            const { questId } = { questId: 1 } // from questCompletes
            const ip = req.ip;
            if (!ip) {
                throw new HttpException('잘못된 접근입니다', HttpStatus.BAD_REQUEST); // IP가 없음??
            }

            const sessionData = {
                userId,
                characterId: character.characterId,
                // questId,
                // inventory: ''
            }
            const data = JSON.stringify(sessionData);
            redis.set(ip, data, { EX: 60*60 });

            const user: UserSession = {
                username,
                name: character.name,
                level: character.level,
                maxhp: character.maxhp,
                maxmp: character.maxmp,
                hp: character.hp,
                mp: character.mp,
                exp: character.exp,
                questId
            }

            res.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    };

    async signout(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;

            await UserService.signout(userId);

            res.status(200).end();
        } catch (error) {
            next(error);
        }
    };
}


export default new UserController();