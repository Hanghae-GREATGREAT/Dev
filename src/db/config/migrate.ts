import sequelize from "./connection";
import { Characters, Fields, Titles, Users } from "../models";

(async () => {
    const drops = [
        Characters.drop(),
        Fields.drop(),
        Titles.drop(),
        Users.drop(),
    ]
    await Promise.all(drops);

    const syncs = [
        Users.sync(),
        Titles.sync(),
        Fields.sync(),
        Characters.sync(),
    ]
    await Promise.all(syncs);

    await sequelize.close();
})();
