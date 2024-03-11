import { DataTypes, Model } from "sequelize";
import db from "../db";
import QuestionModel from "./questionModel";

class FormTypeModel extends Model {
  public id!: number;
  public name!: string;
  // public id_questions!: number;
}

FormTypeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // id_questions: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    sequelize: db,
    modelName: "FormTypeModel",
    tableName: "form_type",
    timestamps: true,
  }
);

FormTypeModel.belongsTo(QuestionModel, {
  foreignKey: "id_form_type",
  as: "questions",
});

FormTypeModel.sync({ alter: true })
  .then(() => {
    console.log("Tabela de tipo de ficha criada com sucesso");
  })
  .catch((error) => {
    console.error("Erro ao criar a tabela de tipo de ficha:", error);
  });

export default FormTypeModel;
