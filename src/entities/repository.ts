import AppDataSource from "../config/dbConfig";
import { Category } from "./Category.entity";
import { Group } from "./Group.entity";
import { SubCategory } from "./SubCategory.entity";
import { SubGroup } from "./SubGroup.entity";


export const categoryRepository = AppDataSource.getRepository(Category);
export const subCategoryRepository = AppDataSource.getRepository(SubCategory);
export const groupRepository = AppDataSource.getRepository(Group);
export const subGroupRespository = AppDataSource.getRepository(SubGroup);





