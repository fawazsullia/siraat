import Cors from "cors";
import dbConfig from "./config/dbConfig";
import 'reflect-metadata';
import { useExpressServer } from "routing-controllers";
import { UserController } from "./controllers/User.controller";
import { CategoryController } from "./controllers/Category.controller";
import { TypeormStore } from "connect-typeorm/out/index";
import express from "express";
import { sessionRepository } from "./entities/repository";
import { AuthController } from "./controllers/Auth.controller";
const session = require("express-session");

const APP_PORT = process.env.APP_PORT || 9005;

const app = express()

// TODO: User path join to import all controllers at once

const cookie: any = {}

if(process.env.NODE_ENV === "production"){
    cookie.secure = true;
    cookie.maxAge = 86400;
    cookie.httpOnly = true;
} else{
    cookie.secure = false;
    cookie.maxAge = 86400;
    cookie.httpOnly = false;
}

app.use(session({
    resave: false,
    saveUninitialized: false,
    store: new TypeormStore({
        cleanupLimit: 2,
        ttl: 86400
    }).connect(sessionRepository),
    secret: "keyboard-cat",
    cookie
}))

useExpressServer(app, {
    middlewares : [],
    routePrefix : "/api",
    controllers : [UserController, CategoryController, AuthController]

});

dbConfig.initialize()
.then(()=> {
    console.log("DB connection successfull. Attempting to start server")
    app.listen(APP_PORT, ()=> console.log(`Server started on port ${APP_PORT}`))
})
.catch(e => console.log(e))
