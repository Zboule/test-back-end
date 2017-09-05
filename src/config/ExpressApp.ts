
import * as express from "express";
import { RequestHandler } from "express";
import { PathParams } from "express-serve-static-core";
import * as bodyParser from "body-parser";

export class ExpressApp {

    protected expressApp: express.Express

    constructor() {
        this.expressApp = express()
        this.setExpressConfig()
    }

    public startApp(): void {
        this.expressApp.listen(3000, function () {
            console.log("Express running");
        });
    }

    public addGet(path: PathParams, requestHandler: RequestHandler) {
        this.expressApp.get(path, requestHandler);
    }

    public addPost(path: PathParams, requestHandler: RequestHandler) {
        this.expressApp.post(path, requestHandler);
    }

    private setExpressConfig() {
        this.expressApp.use(bodyParser.urlencoded({
            extended: true
        }));
        this.expressApp.use(bodyParser.json())
    }
}


