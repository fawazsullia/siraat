import { Request } from "express";
import { HttpError } from "routing-controllers";
import { userRepository } from "../entities/repository";
import { UserCreationType, InternalUserType } from "../enums";
import { CreateUserRequest } from "../models/index";
import { managePassword } from "../utils/managePassword";


class UserService {

    public async createUser(reqBody : CreateUserRequest, req: Request & {session : {user : number | undefined}}){
        let response;
        switch(reqBody.type){
            case UserCreationType.EMAIL:
                response = await this.createUserWithEmail(reqBody);
        }
        req.session.user = response?.id
        return response
    }

    private async createUserWithEmail(options: CreateUserRequest){
        const {email, password, userType, internalUserType} = options;
        try{
            console.log("111111")
            const user = await userRepository.findOne({where: {email}});
            if(user) throw new HttpError(403, "User alredy exists");
            const hashedPassword = await managePassword.hashPassword(password);
            // TO-DO
            // create a company for this user since this is a new user
            if(internalUserType === InternalUserType.ADMIN){
                return await userRepository.save({
                    email,
                    password: hashedPassword,
                    internalUserType,
                    type: userType
                });
            }
            throw new Error("Not supported");

        } catch(e){
            console.log(e, ">>>>>>")
            throw new HttpError(400, "Failed to create a user");
        }
    }
}

export const userService = new UserService()