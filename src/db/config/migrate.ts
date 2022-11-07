import sequelize from './connection';
import { Characters, Fields, Titles, Users, Items } from '../models';
// import * as models from '../models';

(async()=>{
    await Items.drop();
    await Characters.drop();
    await Fields.drop();
    await Titles.drop();
    await Users.drop();

    await Users.sync();
    await Titles.sync();
    await Fields.sync();
    await Characters.sync();
    await Items.sync();

    await sequelize.close();
})();


// (async () => {
//     const modelList = Object.values(models);

//     for (const model of modelList) {
//         await model.drop();
//     }
//     // await Promise.all(drops);

//     modelList.reverse();
//     for (const model of modelList) {
//         await model.sync();
//     }
//     // await Promise.all(syncs);

//     await sequelize.close();
// })();
