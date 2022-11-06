import bcrypt from 'bcrypt';
import { Users } from "../db/models";
import { HttpException, HttpStatus } from '../common';


class UserService {

    async signup({ username, password }: Partial<Users>) {
        const user = {
            username: username!,
            password: await bcrypt.hash(password!, 10),
        }
        await Users.create(user);
    };

    async signin({ username, password }: Partial<Users>) {
        const result = await Users.findOne({
            where: { username, password }
        });

        if (!result) {
            throw new HttpException('아이디, 비밀번호가 일치하지 않습니다', HttpStatus.BAD_REQUEST);
        }
        return result;
    };

    async signout(userId: string) {};
}


export default new UserService();