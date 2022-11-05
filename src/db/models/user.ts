import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/connection";
import Comments from "./comment";
import Posts from "./post";

class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  // declare 안쓰고 하는 방법 ? - 암시적 any가 되기 때문에 찝찝하다.
  declare userId: CreationOptional<number>;
  declare name: string;
  declare password: string;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;

  static associate() {
    this.hasMany(Posts, {
      sourceKey: 'userId',
      foreignKey: 'userId',
    });
    this.hasMany(Comments, {
      sourceKey: 'userId',
      foreignKey: 'userId',
    });
  }
}

Users.init(
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      defaultValue: new Date().toLocaleString(),
    },
    updatedAt: {
      type: DataTypes.STRING,
      defaultValue: new Date().toLocaleString(),
    },
  },
  { sequelize }
);

export default Users;
