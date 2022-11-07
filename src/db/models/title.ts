import {
    Model, DataTypes,
    InferAttributes, InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
import sequelize from '../config/connection';


class Titles extends Model<
    InferAttributes<Titles>, InferCreationAttributes<Titles>
> {

    declare titleId: CreationOptional<number>;
    declare name: string;

    static associate() {}
}

Titles.init({
    titleId: {
      type: DataTypes.TINYINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
}, { 
    sequelize,
    modelName: "Titles",
    timestamps: false,
});

export default Titles;
