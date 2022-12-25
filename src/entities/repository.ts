import AppDataSource from "../config/dbConfig";
import { Category } from "./Category.entity";


export const categoryRepository = AppDataSource.getRepository(Category)





