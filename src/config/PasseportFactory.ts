import * as passport from "passport";
import { passeportStrategyFactory } from "./PasseportStrategyFactory";
import { RequestHandler } from "express";
import { Passport, PassportStatic } from "passport";


export class PassportFactory {

    public static getInstance(): PassportStatic {
        const strategy = passeportStrategyFactory.getJWTStrategy()
        passport.use(strategy)
        return passport;
    }

    public static getLoginFunction(): RequestHandler {
        return passeportStrategyFactory.getLoginFunction()
    }


}

