import {Controller, Get, Post, UseBefore} from "routing-controllers"
import {json} from "body-parser"

@Controller("/user")
@UseBefore(json())
export class UserController{

    /**
     * Creates a new user
     */
    @Post("/create")
    public async create(){
        
    }

}