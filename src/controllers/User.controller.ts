import {Controller, Get, UseBefore} from "routing-controllers"
import {json} from "body-parser"

@Controller("/user")
@UseBefore(json())
export class UserController{

    @Get("/test")
    public async test(){
        console.log("Api hit")
        return "hehe"
    }

}