import { DataTypes, Sequelize, Model, ModelCtor } from "sequelize";

interface IPostAttributes extends Model {
  id: string;
  title: string;
  autor: string;
  content: string;
}

export default function PostModel(
  sequelize: Sequelize
): ModelCtor<IPostAttributes> {
  return sequelize.define<IPostAttributes>(
    "Post",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
}
