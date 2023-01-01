import { IsBoolean, IsString } from "class-validator";

export class GenericReponse {

    @IsBoolean()
    status: boolean;

    @IsString()
    data: string;

    constructor(){
        this.status = true;
        this.data = "Success";
    }
}