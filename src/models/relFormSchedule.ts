import { DataTypes, Model } from "sequelize";
import db from "../db";
import FormTypeModel from "./formTypeModel";
import ScheduleModel from "./scheduleModel";

class RelFormSchedule extends Model {
  public id!: number;
  public id_form_type!: number;
  public id_schedule!: number;
}

RelFormSchedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_form_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_schedule: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "RelFormSchedule",
    tableName: "rel_form_schedule",
    timestamps: true,
  }
);

RelFormSchedule.belongsTo(FormTypeModel, {
  as: "form_type",
  foreignKey: "id_form_type",
});

RelFormSchedule.belongsTo(ScheduleModel, {
  as: "schedule",
  foreignKey: "id_schedule",
});

RelFormSchedule.sync({ alter: true })
  .then(() => {
    console.log("Tabela de rel_form_schedule criada com sucesso");
  })
  .catch((err) => {
    console.error("Erro ao criar a tabela de rel_form_schedule: ", err);
  });

export default RelFormSchedule;
