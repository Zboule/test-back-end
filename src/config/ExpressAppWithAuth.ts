
/**
 * @file	Class that add auth to a wrap of an express app
 * @author	Jordane CURÉ
 */

import * as bodyParser from 'body-parser'
import * as express from 'express'
// tslint:disable-next-line:no-duplicate-imports
import { RequestHandler } from 'express'
import { PathParams } from 'express-serve-static-core'
import { Passport, PassportStatic } from 'passport'

import { ExpressApp } from './ExpressApp'
import { PassportFactory } from './PasseportFactory'

export class ExpressAppWithAuth extends ExpressApp {

    private passport: PassportStatic

    constructor() {
        super()
        this.passport = PassportFactory.getInstance()
        this.setExpressWithAuthConfig()
    }

    public addPrivateGet(path: PathParams, requestHandler: RequestHandler): void {
        this.expressApp.get(
            path,
            this.passport.authenticate(
                'jwt',
                {
                    session: false,
                }
            ),
            requestHandler
        )
    }

    private setExpressWithAuthConfig(): void {
        this.expressApp.use(this.passport.initialize())
        this.addPost('/login', PassportFactory.getLoginFunction())
    }
}

