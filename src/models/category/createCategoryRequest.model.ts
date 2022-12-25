import { IsEnum, IsOptional, IsString } from "class-validator";
import { CategoryContext } from "../../enums/CategoryContext.enum";
import { CategoryField } from "../../enums/CategoryField.enum";

export class CreatecategoryRequest {

    @IsString({message : "Name must be a string"})
    @IsOptional()
    name?: string;

    @IsString()
    shortName: string;

    @IsEnum(CategoryContext)
    context:CategoryContext;

    @IsEnum(CategoryField)
    field: CategoryField;

    @IsString()
    @IsOptional()
    categoryShortName?: string;

    @IsString()
    @IsOptional()
    subCategoryShortName?: string;

    @IsString()
    @IsOptional()
    groupShortName?: string;

    @IsString()
    @IsOptional()
    subGroupShortName?: string;

}