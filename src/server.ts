import Express from "express";
import Cors from "cors";
import dbConfig from "./config/dbConfig";
import 'reflect-metadata';
import { createExpressServer } from "routing-controllers";
import path from "path";
import { UserController } from "./controllers/User.controller.js";

const APP_PORT = process.env.APP_PORT || 9005;
console.log(__dirname)

const app = createExpressServer({
    routePrefix : "/api",
    controllers : [path.join(__dirname + "/controllers/index.js")]

})



dbConfig.initialize()
.then(()=> {
    console.log("DB connection successfull. Attempting to start server")
    app.listen(APP_PORT, ()=> console.log(`Server started on port ${APP_PORT}`))
})
.catch(e => console.log(e))
