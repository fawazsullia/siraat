import { Body, Get, JsonController, Post, UseBefore } from "routing-controllers";
import { categoryService } from "../services/Category.service";
import {json} from "body-parser"
import { CreatecategoryRequest, GenericReponse } from "../models/index";
import { CreateCategoryResponse } from "../models/category/createCategoryResponse.model";


@JsonController("/category")
@UseBefore(json())
export class CategoryController{

    // TODO: Implement authentication checking middleware
    // only admin user can add or delete category

    /**
     * API to create, update or delete a category, subcategory, group or a subgroup
     * @param requestBody
     * @returns generic success response
     */

    @Post("/handle")
    public async createCategory(
        @Body() requestBody: CreatecategoryRequest
    ) : Promise<GenericReponse>{
        await categoryService.handleCategory(requestBody);
        return new GenericReponse()
    }

    /**
     * api to get categories, both aggregated and alone
     * @param requestBody 
     * @returns categories or aggregated categories
     */
    // TO-DO: implement response model
    @Post("/getCategories")
    public async getCategories(
        @Body() requestBody: {isAggregated? : boolean}
    ) : Promise<any>{
        const response = await categoryService.getCategories(requestBody.isAggregated);
        return response
    }

    @Post("/getSubcategories")
    public async getSubCategories(
        @Body() requestBody: {isAggregated? : boolean, categoryId?: number}
    ) : Promise<any>{
        const response = await categoryService.getSubCategories(requestBody);
        return response
    }

    @Post("/getGroups")
    public async getGroups(
        @Body() requestBody: {isAggregated? : boolean, subCategoryId?: number}
    ) : Promise<any>{
        const response = await categoryService.getGroups(requestBody);
        return response
    }

    @Post("/getSubGroups")
    public async getSubGroups(
        @Body() requestBody: {groupId?: number}
    ) : Promise<any>{
        const response = await categoryService.getSubGroups(requestBody);
        return response
    }
}