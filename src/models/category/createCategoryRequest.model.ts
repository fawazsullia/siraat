import { IsOptional, IsString } from "class-validator";

export class CreatecategoryRequest {

    @IsString({message : "Name must be a string"})
    name: string;

    @IsString()
    @IsOptional()
    shortName?: string;
}