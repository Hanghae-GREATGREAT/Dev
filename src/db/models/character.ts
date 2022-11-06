import sequelize from '../config/connection';
import { Fields, Titles, Users } from '../models';
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

    declare User: NonAttribute<Users>
    // declare Title: NonAttribute<>;
    // declare Field: NonAttribute<>;
};

Characters.init({
    characterId: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        references: {
            model: Users,
            key: 'userId',
        }
    },
    titleId: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
            model: Titles,
            key: 'titleId',
        }
    },
    fieldId: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
            model: Fields,
            key: 'fieldId'
        }
    },

    name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
    },
    job: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    level: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
    },
    attack: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
    },
    defense: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
    },
    hit: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
    },
    mana: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
    },
    exp: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Characters'
});


export default Characters;