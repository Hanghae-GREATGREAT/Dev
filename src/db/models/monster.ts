import {
    Model, DataTypes,
    InferAttributes, InferCreationAttributes,
    CreationOptional, ForeignKey
} from 'sequelize';
import sequelize from '../config/connection';


class Monsters extends Model<
    InferAttributes<Monsters>, InferCreationAttributes<Monsters>
> {

    declare monsterId: CreationOptional<number>;
    // declare fieldId: ForeignKey<number>;

    declare fieldId: number;

    declare name: string;
    declare type: number;
    declare hp: number;
    declare attack:number;
    declare defense: number;
    declare exp: number;

    static associate() {}
}

Monsters.init({
    monsterId: {
      type: DataTypes.SMALLINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    fieldId: {
    type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    //   references: {
    //       model: 'Fields',
    //       key: 'fieldId'
    //   }
    },
    name: DataTypes.STRING(40),
    type: DataTypes.TINYINT.UNSIGNED,
    hp: DataTypes.MEDIUMINT.UNSIGNED,
    attack: DataTypes.MEDIUMINT.UNSIGNED,
    defense:DataTypes.MEDIUMINT.UNSIGNED,
    exp: DataTypes.MEDIUMINT.UNSIGNED,
}, { 
    sequelize,
    modelName: "Monsters",
    timestamps: false,
});

export default Monsters;
