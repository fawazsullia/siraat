import { json } from "body-parser";
import { Body, Get, JsonController, Post, Req, UseBefore } from "routing-controllers";
import { getSessionUser, verifySession } from "../middlewares/SessionMiddleware";
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
    ){  
        if(req.user) return req.user;
        const user = await authService.loginUser(reqBody);
        req.session.user = user.id;
        return user;
        
    }

    @Get("/local")
    @UseBefore(verifySession)
    @UseBefore(getSessionUser)
    public async authenticate(
        @Req() req: any
    ){
        return req.user;
    }
}