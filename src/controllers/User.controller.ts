import {Controller, Get} from "routing-controllers"

@Controller()
export class UserController{

    @Get("/test")
    public async test(){
        console.log("Api hit")
        return "hehe"
    }

}