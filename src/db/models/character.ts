import sequelize from '../config/connection';
import {
    Model, DataTypes,
    InferAttributes, InferCreationAttributes,
    CreationOptional, ForeignKey, NonAttribute
} from 'sequelize'


class Characters extends Model<
    InferAttributes<Characters>, InferCreationAttributes<Characters>
>{
    declare characterId: CreationOptional<number>;
    declare userId: ForeignKey<number>;
    declare titleId: ForeignKey<number>;
    declare fieldId: ForeignKey<number>;

    declare name: string;
    declare job: number;
    declare level: number;
    declare attack: number;
    declare defense: number;
    declare hit: number;
    declare mana: number;
    declare exp: number;
};

// Characters.init({
//     characterId: {
//         type: DataTypes.MEDIUMINT.UNSIGNED,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     userId: {},
//     titleId: {},
//     fieldId: {},

//     name: {},
//     job: {},
//     level: {},
//     attack: {},
//     defense: {},
//     hit: {},
//     mana: {},
//     exp: {},
// }, {
//     sequelize,
//     modelName: 'Characters'
// });


export default Characters;