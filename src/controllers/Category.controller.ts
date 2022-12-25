import { Body, JsonController, Post, UseBefore } from "routing-controllers";
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
     * API to create a category
     * @param requestBody : name, shortname
     * @returns created category
     */

    @Post("/create")
    public async createCategory(
        @Body() requestBody: CreatecategoryRequest
    ) : Promise<CreateCategoryResponse>{
        const {name, shortName} = requestBody;
        const response =  await categoryService.createCategory(name, shortName);
        return new CreateCategoryResponse(response)
    }

    @Post("/update")
    public async updateCategory(
        @Body() requestBody: any
    ) : Promise<GenericReponse>{
        const {name, newName} = requestBody;
        await categoryService.updateCategory(name, newName);
        return new GenericReponse();
    }
}