//implements singleton pattern to init db
import dotenv from "dotenv"
dotenv.config()
import {DataSource} from "typeorm"
import { Category, Group, Product, SubCategory, SubGroup, User } from "../entities";

const DB_PORT = Number(process.env.DB_PORT);
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const entities = [User, Category, SubCategory, Group, SubGroup, Product, User];



const AppDataSource = new DataSource({
            type: "postgres",
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            synchronize: true,
            logging: true,
            entities,
            subscribers: [],
            migrations: [],
})

export default AppDataSource;