import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
} from 'sequelize';
import sequelize from '../config/connection';
import Posts from './post';
import Users from './user';

class Comments extends Model<
    InferAttributes<Comments>,
    InferCreationAttributes<Comments>
> {
    declare commentId: CreationOptional<number>;
    declare userId: ForeignKey<number>;
    declare postId: ForeignKey<number>;
    declare comment: string;
    declare createdAt: CreationOptional<string>;
    declare updatedAt: CreationOptional<string>;

    static associate() {
        this.belongsTo(Users, {
            foreignKey: 'userId',
            targetKey: 'userId'
        });
        this.belongsTo(Posts, {
            foreignKey: 'postId',
            targetKey: 'postId'
        });
    }
}

Comments.init(
    {
        commentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        postId: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: 'Posts',
                key: 'postId'
            }
        },
        comment: {
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
        modelName: 'Comments',
    },
);

export default Comments;
