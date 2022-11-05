import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
} from 'sequelize';
import sequelize from '../config/connection';
import Comments from './comment';
import Users from './user';

class Posts extends Model<
    InferAttributes<Posts>,
    InferCreationAttributes<Posts>
> {
    declare postId: CreationOptional<number>;
    declare userId: ForeignKey<number>;
    declare title: string;
    declare content: string;
    declare createdAt: CreationOptional<string>;
    declare updatedAt: CreationOptional<string>;
    
    static associate() {
        this.belongsTo(Users, {
            foreignKey: 'userId',
            targetKey: 'userId'
        });
        this.hasMany(Comments, {
            sourceKey: 'postId',
            foreignKey: 'postId'
        });
    }
}

Posts.init(
    {
        postId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            // references: {
            //     model: 'Users',
            //     key: 'userId'
            // }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
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
    {
        sequelize,
        modelName: 'Posts',
    },
);

export default Posts;
