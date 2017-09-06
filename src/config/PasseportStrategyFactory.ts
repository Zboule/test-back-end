
/**
 * @file	Create the JWT Strategy for passport
 * @author	Jordane CURÉ
 */

import { Request, RequestHandler, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt'

class PasseportStrategyFactory {


    private jwtOptions: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: 'tasmanianDevil',
    }

    public getJWTStrategy(): Strategy {
        return new Strategy(this.jwtOptions, this.verifyCallBack)
    }

    public getLoginFunction(): RequestHandler {
        return this.loginFunction
    }

    public loginFunction(req: Request, res: Response): void {

        const user = this.getAuthUser(req.body.name, req.body.password)

        if (!user) {
            res.status(401).json({
                message: 'Utilisateur impossible à identifier',
            })
        }
        else {
            const payload = {
                id: user.id,
            }
            const token = sign(payload, this.jwtOptions.secretOrKey)
            res.json({
                message: 'ok',
                token,
            })
        }

    }

    private verifyCallBack(payload: any, done: VerifiedCallback): void {

        let user
        if (payload.id === 'jordane') {
            user = {
                name: 'jordane',
            }
        }

        done(null, user ? user : user)
    }

    // This logic must be move away
    private getAuthUser(login: string, pwd: string): any {
        let user

        if (login && login === 'jordane' && pwd && pwd === 'test') {
            user = {
                name: 'jordane',
                password: 'test',
            }
        }

        return user
    }

}

export const passeportStrategyFactory: PasseportStrategyFactory = new PasseportStrategyFactory()

