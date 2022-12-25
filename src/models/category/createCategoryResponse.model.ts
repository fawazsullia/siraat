import { Type } from "class-transformer";
import { IsBoolean, IsObject, IsString } from "class-validator";
import { Category } from "../../entities/Category.entity";

export class CreateCategoryResponse {

    @IsBoolean()
    status: boolean;

    @IsObject()
    @Type(()=> Category)
    data: Category;

    constructor(data : Category){
        this.status = true;
        this.data = data;
    }
}