
/**
 * @file	Passport warper
 * @author	Jordane CURÉ
 */

import { RequestHandler } from 'express'
import * as passport from 'passport'
// tslint:disable-next-line:no-duplicate-imports
import { Passport, PassportStatic } from 'passport'
import { passeportStrategyFactory } from './PasseportStrategyFactory'


export class PassportFactory {

    public static getInstance(): PassportStatic {
        const strategy = passeportStrategyFactory.getJWTStrategy()
        passport.use(strategy)
        return passport
    }

    public static getLoginFunction(): RequestHandler {
        return passeportStrategyFactory.getLoginFunction()
    }


}

