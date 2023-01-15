import { json } from "body-parser";
import { Body, JsonController, Post, Req, UseBefore } from "routing-controllers";
import { getSessionUser } from "../middlewares/SessionMiddleware";
import { LoginRequest } from "../models";
import { authService } from "../services/Auth.service";


@JsonController("/auth")
@UseBefore(json())
export class AuthController {

    @Post("/login")
    @UseBefore(getSessionUser)
    public async login(
        @Body() reqBody: LoginRequest,
        @Req() req: any
    ){          console.log(req.user, "??????")
        if(req.user) return req.user;
        const user = await authService.loginUser(reqBody);
        req.session.user = user.id;
        return user;
        
    }
}