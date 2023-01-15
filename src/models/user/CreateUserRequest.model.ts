import { IsEnum, IsOptional, IsString, Min, ValidateIf } from "class-validator";
import { InternalUserType, UserCreationType } from "../../enums";
import { UserType } from "../../enums/UserType.enum";


export class CreateUserRequest{

    @IsEnum(UserCreationType)
    type: UserCreationType;

    @IsEnum(UserType)
    userType: UserType;

    @IsString()
    email: string;

    @IsString()
    @ValidateIf((o)=> o.type === UserCreationType.EMAIL)
    password: string;

    @IsEnum(InternalUserType)
    internalUserType: InternalUserType;

}