import sequelize from "./connection";
import { Users } from "../models";

(async () => {
  await Users.drop();

  await Users.sync();

  await sequelize.close();
})();
