import { HttpError } from "routing-controllers";
import { userRepository } from "../entities/repository";
import { LoginRequest } from "../models";
import { managePassword } from "../utils/managePassword";

class AuthService {

    public async loginUser(reqBody: LoginRequest){
        try{
            const user = await userRepository.findOne({where: {email: reqBody.email}});
            if(!user) throw new HttpError(404, "Wrong email or password");
            const password = await managePassword.checkPassword(reqBody.password, user.password);
            if(!password) throw new HttpError(404, "Wrong email or password");
            // decide what needs to be returned based on optimal solution
            return user;

        }catch(e){
            throw new HttpError(500, "Failed to login user");
        }
    }

}

export const authService = new AuthService()