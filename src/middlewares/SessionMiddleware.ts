import { NextFunction, Request } from "express"
import { HttpError } from "routing-controllers"
import { userRepository } from "../entities/repository";

export const verifySession = (req: Request & {session : {user: number}},res: Response, next: NextFunction) => {

    if(!req.session || !req.session.user) throw new HttpError(400, "User not logged in");
    next(req.session.user);
}

export const getSessionUser = async (req: Request & {session: {user: number}}, res: Response, next: NextFunction) =>{
    if(!req.session || !req.session.user) throw new HttpError(400, "User not logged in");
    const user = await userRepository.findOne({where: {id: req.session.user}});
    if(!user) throw new HttpError(404, "Logged in user not found");
    next(user);
}