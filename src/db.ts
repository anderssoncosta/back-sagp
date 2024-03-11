import { Sequelize } from "sequelize";
import { Credentials } from "./util/credentials";

const connection = new Sequelize(
  Credentials.db.db,
  Credentials.db.user,
  Credentials.db.password,
  {
    host: Credentials.db.host,
    dialect: Credentials.db.dialect as any,
  }
);

connection
  .authenticate()
  .then(() => {
    console.log("Authentication successful");
  })
  .catch((error) => {
    console.log(`Authentication failed => ${error}`);
  });

export default connection;
