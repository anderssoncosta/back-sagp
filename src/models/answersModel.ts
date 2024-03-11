import { DataTypes, Model } from "sequelize";
import db from "../db";
import RelFormSchedule from "./relFormSchedule";
import QuestionModel from "./questionModel";

class AnswerModel extends Model {
  public id!: number;
  public answers!: string;
  public id_questions!: number;
  public id_rel_form_schedule!: number;
}

AnswerModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    answers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_questions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_rel_form_schedule: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "AnswerModel",
    tableName: "answers",
    timestamps: true,
  }
);

AnswerModel.belongsTo(QuestionModel, {
  foreignKey: "id_questions",
  as: "question",
});

AnswerModel.belongsTo(RelFormSchedule, {
  foreignKey: "id_rel_form_schedule",
  as: "rel_form_schedule",
});

AnswerModel.sync({ alter: true })
  .then(() => {
    console.log("Tabela de respostas criada com sucesso");
  })
  .catch((error) => {
    console.error("Erro ao criar a tabela de respostas:", error);
  });

export default AnswerModel;
