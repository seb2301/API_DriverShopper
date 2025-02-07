import { DataSource } from "typeorm";
import { Driver } from "./src/models/Driver";
import { Ride } from "./src/models/Ride";
import { User } from "./src/models/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "your_password",
  database: process.env.MYSQL_DATABASE || "rides_db",
  entities: [Driver, Ride, User],
  synchronize: true, 
});
