import {Body, Controller, Get, Post, Req, UseBefore} from "routing-controllers"
import {json} from "body-parser"
import { userService } from "../services/User.service"
import { CreateUserRequest } from "../models/index"
import { Request } from "express"

@Controller("/user")
@UseBefore(json())
export class UserController {

    /**
     * Creates a new user
     */
    @Post("/create")
    public async create(
        @Body() reqBody : CreateUserRequest,
        @Req() req: Request & {session : {user: number}}
    ){
        console.log("222222")
        const response = await userService.createUser(reqBody, req)
        return response
    }
}