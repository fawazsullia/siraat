import { HttpError } from "routing-controllers"
import { categoryRepository } from "../entities/repository"

class CategoryService{

    public async createCategory(name: string, shortName?: string){

        try{
            const category = await categoryRepository.save({
                name,
                shortName
            });
            return category;
        } catch(e){
            throw new HttpError(400, "Could not create category");
        }
    }

    public async updateCategory(name: string, newName: string){

        try{
            const category = await categoryRepository.update({name}, {name: newName});
            return category;
        } catch(e){
            throw new HttpError(400, "Could not update category");
        }
    }

}

export const categoryService = new CategoryService()