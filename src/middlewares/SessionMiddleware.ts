import { NextFunction, Request, Response } from "express"
import { HttpError } from "routing-controllers"
import { userRepository } from "../entities/repository";
import { User } from "../entities/User.entity";

export const verifySession = (req: Request & {session : {user: number}},res: Response, next: NextFunction) => {
    if(req.session && req.session.user){
        next();
    }
    res.status(401).json({status: false, data: "User not logged in"});
}

export const getSessionUser = async (req: Request & {user? : User ,session: {user: number}}, res: Response, next: NextFunction) =>{
    if(!req.session) next();
    const user = await userRepository.findOne({where: {id: req.session.user}});
    if(!user) return res.status(404).json({status : false, data: "User not found"});
    req.user = user || undefined;
    next();
}

export const isAuth = async (req: Request & {user? : User ,session: {user: number}}, res: Response, next: NextFunction) => {
    if(!req.session || (req.session && !req.session.user)) return res.status(401).json({status: false, data: "Not authorised"});
    const user = await userRepository.findOne({where: {id: req.session.user}});
    if(!user) return res.status(404).json({status : false, data: "User not found"});
    req.user = user || undefined;
    next();
}