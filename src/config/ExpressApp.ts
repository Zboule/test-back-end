
/**
 * @file	Class that wrap an express app
 * @author	Jordane CURÉ
 */

import * as bodyParser from 'body-parser'
import * as express from 'express'
// tslint:disable-next-line:no-duplicate-imports
import { RequestHandler } from 'express'
import { PathParams } from 'express-serve-static-core'

export class ExpressApp {

    protected expressApp: express.Express

    constructor() {
        this.expressApp = express()
        this.setExpressConfig()
    }

    public startApp(): void {
        this.expressApp.listen(3000, () => {
            console.log('Express running')
        })
    }

    public addGet(path: PathParams, requestHandler: RequestHandler): void {
        this.expressApp.get(path, requestHandler)
    }

    public addPost(path: PathParams, requestHandler: RequestHandler): void {
        this.expressApp.post(path, requestHandler)
    }

    private setExpressConfig(): void {
        this.expressApp.use(bodyParser.urlencoded({
            extended: true,
        }))
        this.expressApp.use(bodyParser.json())
    }
}

