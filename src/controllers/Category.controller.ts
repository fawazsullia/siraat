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
     * API to create, update or delete a category
     * @param requestBody : name, shortname
     * @returns created category
     */

    @Post("/handle")
    public async createCategory(
        @Body() requestBody: CreatecategoryRequest
    ) : Promise<GenericReponse>{
        await categoryService.handleCategory(requestBody);
        return new GenericReponse()
    }

    @Post("/getCategories")
    public async getCategories(
        @Body() requestBody: {isAggregated? : boolean}
    ) : Promise<any>{
        const response = await categoryService.getCategories(requestBody.isAggregated);
    }
}