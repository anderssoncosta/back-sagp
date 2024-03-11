import { DataTypes, Model, Sequelize } from "sequelize";
import db from "../db";

class QuestionModel extends Model {
  public id!: number;
  public questions!: string;
}

QuestionModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    questions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "QuestionModel",
    tableName: "questions",
    timestamps: true,
  }
);

QuestionModel.sync({ alter: true })
  .then(() => {
    console.log("Tabela de perguntas criada com sucesso");
  })
  .catch((error) => {
    console.error("Erro ao criar a tabela de perguntas:", error);
  });

export default QuestionModel;
