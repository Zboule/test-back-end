
import * as express from "express";
import { RequestHandler } from "express";
import { PathParams } from "express-serve-static-core";
import { Passport, PassportStatic } from "passport";
import * as bodyParser from "body-parser";

import { PassportFactory } from "./PasseportFactory";
import { ExpressApp } from "./ExpressApp";

export class ExpressAppWithAuth extends ExpressApp {

    private passport: PassportStatic

    constructor() {
        super()
        this.passport = PassportFactory.getInstance()
        this.setExpressWithAuthConfig()
    }

    public addPrivateGet(path: PathParams, requestHandler: RequestHandler) {
        this.expressApp.get(
            path,
            this.passport.authenticate(
                'jwt',
                {
                    session: false
                }
            ),
            requestHandler
        );
    }

    private setExpressWithAuthConfig() {
        this.expressApp.use(this.passport.initialize());
        this.addPost("/login", PassportFactory.getLoginFunction())
    }
}


