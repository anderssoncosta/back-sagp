import { DataTypes, Model } from "sequelize";
import db from "../db";
import ScheduleModel from "./scheduleModel";

class PatientsModel extends Model {
  public id!: number;
  public name!: string;
  public age!: number;
  public birth!: Date;
  public resp!: string;
  public email!: string;
  public gender!: string;
  public phone!: string;
  public naturalness!: string;
  public city!: string;
  public district!: string;
  public zipcode!: string;
  public address!: string;
  public id_scheduling!: number;
}

PatientsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    resp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    naturalness: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_plug_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "PatientsModel",
    tableName: "patients",
    timestamps: true,
  }
);

PatientsModel.belongsTo(ScheduleModel, {
  foreignKey: "id_scheduling",
  as: "schedule",
});


PatientsModel.sync({ alter: true })
  .then(() => {
    console.log("Tabela de pacientes criada com sucesso");
  })
  .catch((error) => {
    console.error("Erro ao criar a tabela de pacientes:", error);
  });

export default PatientsModel;
