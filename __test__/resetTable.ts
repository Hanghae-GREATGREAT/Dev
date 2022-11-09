import * as models from '../src/db/models';


export default async () => {
    const modelList = Object.values(models);

    for (const model of modelList) {
        await model.drop();
    }

    modelList.reverse();
    for (const model of modelList) {
        await model.sync();
    }
};
