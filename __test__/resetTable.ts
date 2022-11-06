// import sequelize from '../src/db/config/connection';
import { Users } from '../src/db/models';

export default async() => {
    await Users.drop();

    await Users.sync();
};
