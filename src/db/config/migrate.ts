import sequelize from './connection';
import * as models from '../models';


(async () => {
    const modelList = Object.values(models);

    const drops = modelList.map(model=>model.drop());
    await Promise.all(drops);

    modelList.reverse();
    const syncs = modelList.map(model=>model.sync());
    await Promise.all(syncs);

    await sequelize.close();
})();
