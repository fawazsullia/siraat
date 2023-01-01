import Cors from "cors";
import dbConfig from "./config/dbConfig";
import 'reflect-metadata';
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/User.controller";
import { CategoryController } from "./controllers/Category.controller";

const APP_PORT = process.env.APP_PORT || 9005;

// TODO: User path join to import all controllers at once

const app = createExpressServer({
    middlewares : [],
    routePrefix : "/api",
    controllers : [UserController, CategoryController]

})


dbConfig.initialize()
.then(()=> {
    console.log("DB connection successfull. Attempting to start server")
    app.listen(APP_PORT, ()=> console.log(`Server started on port ${APP_PORT}`))
})
.catch(e => console.log(e))
