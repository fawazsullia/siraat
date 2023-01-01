import { HttpError } from "routing-controllers"
import { categoryRepository, groupRepository, subCategoryRepository, subGroupRespository } from "../entities/repository"
import { CategoryContext } from "../enums/CategoryContext.enum";
import { CategoryField } from "../enums/CategoryField.enum";
import { CreatecategoryRequest } from "../models/index";

class CategoryService{

    /**
     * 
     * @param requestBody 
     * handles category creation, updation and deletion
     * returns void
     */ 
    public async handleCategory(requestBody: CreatecategoryRequest): Promise<void>{

        try{
            const {name, shortName, context, field, 
                categoryShortName, subCategoryShortName, 
                subGroupShortName, groupShortName
            } = requestBody
            switch(field){
                case CategoryField.CATEGORY:
                    await this.categoryHandler(name, shortName, context);
                    break;
                case CategoryField.SUB_CATEGORY:
                    await this.subCategoryHandler(name, shortName, context, categoryShortName);
                    break;
                case CategoryField.GROUP:
                    await this.groupHandler(name, shortName, context, subCategoryShortName);
                    break;
                case CategoryField.SUB_GROUP:
                    await this.subGroupHandler(name, shortName, context, groupShortName);
                    break;
            
            }
        } catch(e: any){
            throw new HttpError(400, e.message);
        }
    }

    /**
     * 
     * @param isAggregated 
     * @returns categories
     * Controller service to get categories
     */
    public async getCategories(isAggregated?: boolean){
        let relations: string[] = [];
        if(isAggregated){
            relations = ["subCategories", "subCategories.groups"];
        }
        try{
            const categories = await categoryRepository.find({
                relations : relations
            })
            return categories;
        } catch(e: any){
            throw new HttpError(400, e.message)
        }
    }

    /**
     * 
     * @param requestBody 
     * @returns 
     * Controller service to get subcategories
     */
    public async getSubCategories(requestBody?: any){
        let relations: string[] = [];
        const query : any = {}
        const {isAggregated, categoryId} = requestBody
        if(isAggregated){
            relations = ["groups"];
        }
        if(categoryId) query.categoryId = categoryId
        try{
            const subCategories = await subCategoryRepository.find({
                relations : relations,
                where: query
            })
            return subCategories;
        } catch(e: any){
            throw new HttpError(400, e.message)
        }
    }

    /**
     * 
     * @param requestBody 
     * @returns 
     * Controller service to get groups
     */
    public async getGroups(requestBody: any){
        const {isAggregated, subCategoryId} = requestBody
        let relations: string[] = [];
        const query: any = {}
        if(isAggregated){
            relations = ["subGroups"];
        }
        if(subCategoryId) query.subCategoryId = subCategoryId
        try{
            const groups = await groupRepository.find({
                relations : relations,
                where: query
            })
            return groups;
        } catch(e: any){
            throw new HttpError(400, e.message)
        }
    }

    /**
     * 
     * @param requestBody 
     * @returns 
     * Controller service to get subGroups
     */
    public async getSubGroups(requestBody: any){
        const {isAggregated, groupId} = requestBody
        let relations: string[] = [];
        const query: any = {}
        if(groupId) query.subCategoryId = groupId
        try{
            const subGroups = await subGroupRespository.find({
                relations : relations,
                where: query
            })
            return subGroups;
        } catch(e: any){
            throw new HttpError(400, e.message)
        }
    }

    // handle categpry creation, updation and deletion
    async categoryHandler(name: string | undefined, shortName: string, context: CategoryContext): Promise<void>{
        switch(context){
            case CategoryContext.CREATE:
                if(!name) throw new HttpError(400, "Name is required to create a category");
                await categoryRepository.save({name, shortName});
                break;
            case CategoryContext.DELETE:
                await categoryRepository.delete({shortName});
                break;
            case CategoryContext.UPDATE:
                if(!name) throw new HttpError(400, "Name is required to update a category")
                await categoryRepository.update({shortName}, {name})
        }
    }

    // handle subcategory creation, updation and deletion
    async subCategoryHandler(name: string | undefined, shortName: string, context: CategoryContext, categoryShortName: string|undefined): Promise<void>{
        switch(context){
            case CategoryContext.CREATE:
                console.log(name, categoryShortName, shortName,"--------")
                if(!name || !categoryShortName) throw new HttpError(400, "Name and Categoryshortname is required to create a subcategory");

                const category = await categoryRepository.findOne({
                    where : {
                        shortName : categoryShortName
                    },
                })
                if(!category) throw new HttpError(400, `Category wit shortName ${categoryShortName} not found`);
                await subCategoryRepository.save({name, shortName, category});
                break;
            case CategoryContext.DELETE:
                await subCategoryRepository.delete({shortName});
                break;
            case CategoryContext.UPDATE:
                if(!name) throw new HttpError(400, "Name is required to update a category");
                await subCategoryRepository.update({shortName}, {name});
        }
    }

    // handle group creation, updation and deletion
    async groupHandler(name: string | undefined, shortName: string, context: CategoryContext, subCategoryShortName: string|undefined): Promise<void>{
        switch(context){
            case CategoryContext.CREATE:
                if(!name || !subCategoryShortName) throw new HttpError(400, "Name and subcategoryshortname is required to create a group");
                const subCategory = await subCategoryRepository.findOne({
                    where : {
                        shortName : subCategoryShortName
                    },
                })
                if(!subCategory) throw new HttpError(400, `SubCategory wit shortName ${subCategoryShortName} not found`);
                await groupRepository.save({name, shortName, subCategory});
                break;
            case CategoryContext.DELETE:
                await groupRepository.delete({shortName});
                break;
            case CategoryContext.UPDATE:
                if(!name) throw new HttpError(400, "Name is required to update a group");
                await groupRepository.update({shortName}, {name});
        }
    }

    // handle subgroup creation, updation and deletion
    async subGroupHandler(name: string | undefined, shortName: string, context: CategoryContext, groupShortName: string|undefined): Promise<void>{
        switch(context){
            case CategoryContext.CREATE:
                if(!name || !groupShortName) throw new HttpError(400, "Name and groupshortname is required to create a subcategory");
                const group = await groupRepository.findOne({
                    where : {
                        shortName : groupShortName
                    },
                })
                if(!group) throw new HttpError(400, `Group wit shortName ${groupShortName} not found`);
                await subGroupRespository.save({name, shortName, group});
                break;
            case CategoryContext.DELETE:
                await subGroupRespository.delete({shortName});
                break;
            case CategoryContext.UPDATE:
                if(!name) throw new HttpError(400, "Name is required to update a subgroup");
                await subGroupRespository.update({shortName}, {name});
        }
    }
}

export const categoryService = new CategoryService();