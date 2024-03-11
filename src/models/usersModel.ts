import { DataTypes, Model, Sequelize } from "sequelize";
import db from "../db";

class UsersModel extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public phone!: string;
  public city!: string;
  public district!: string;
  public zipcode!: string;
  public address!: string;
}

UsersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "UsersModel",
    tableName: "users",
    timestamps: true,
  }
);

UsersModel.sync({ alter: true })
  .then(() => {
    console.log("Tabela de pacientes criada com sucesso");
  })
  .catch((error) => {
    console.error("Erro ao criar a tabela de pacientes: ", error);
  });

export default UsersModel;
