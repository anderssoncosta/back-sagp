import { DataTypes, Model } from "sequelize";
import db from "../db";
import FormTypeModel from "./formTypeModel";

class ScheduleModel extends Model {
  public id!: number;
  public date!: Date;
  public hour!: string;
  public id_patient!: number;
  public id_form_type!: number;
  // public id_professional!: number;
}

ScheduleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_patient: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_form_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // id_professional: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
  },
  {
    sequelize: db,
    modelName: "ScheduleModel",
    tableName: "schedule",
    timestamps: true,
  }
);

// ScheduleModel.belongsTo(PatientsModel, {
//   foreignKey: "id_patient",
//   as: "patients",
// });


ScheduleModel.belongsTo(FormTypeModel, {
  foreignKey: "id_form_type",
  as: "form_type",
});

ScheduleModel.sync({ alter: true })
  .then(() => {
    console.log("Tabela Agenda criada com sucesso");
  })
  .catch((error) => {
    console.error("Erro ao criar a tabela de pacientes:", error);
  });

export default ScheduleModel;
