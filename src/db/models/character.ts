import sequelize from '../config/connection';
import { 
    Model, DataTypes,
    InferAttributes, InferCreationAttributes,
    CreationOptional, ForeignKey 
} from 'sequelize';

class Characters extends Model<
    InferAttributes<Characters>, InferCreationAttributes<Characters>
> {
    declare characterId: CreationOptional<number>
    declare userId: ForeignKey<number>
    declare titleId: ForeignKey<number>
    declare fieldId: ForeignKey<number>

    declare name: string;
    declare job: string;
    declare level: number;
    declare attack: number;
    declare defense: number;
    declare maxhp: number;
    declare maxmp: number;
    declare hp: number;
    declare mp: number;
    declare exp: number;

    declare createdAt: number;
    declare updatedAt: number;
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
            model: 'Users',
            key: 'userId'
        }
    },
    titleId: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        references: {
            model: 'Titles',
            key: 'titleId'
        }
    },
    fieldId: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        references: {
            model: 'Fields',
            key: 'fieldId'
        }
    },

    name: {
        type: DataTypes.STRING(40),
        unique: true
    },
    job: DataTypes.STRING(40),
    level: DataTypes.TINYINT.UNSIGNED,
    attack: DataTypes.MEDIUMINT.UNSIGNED,
    defense: DataTypes.MEDIUMINT.UNSIGNED,
    maxhp: DataTypes.MEDIUMINT.UNSIGNED,
    maxmp: DataTypes.MEDIUMINT.UNSIGNED,
    hp: DataTypes.MEDIUMINT.UNSIGNED,
    mp: DataTypes.MEDIUMINT.UNSIGNED,
    exp: DataTypes.MEDIUMINT.UNSIGNED,

    createdAt: {
        type: DataTypes.INTEGER,
        defaultValue: (Date.now()/1000)|0 + 60 * 60 * 9,
      },
      updatedAt: {
        type: DataTypes.INTEGER,
        defaultValue: (Date.now()/1000)|0 + 60 * 60 * 9,
      },
}, {
    sequelize,
    modelName: 'Characters'
});

export default Characters;