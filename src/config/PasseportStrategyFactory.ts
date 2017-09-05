import { StrategyOptions, Strategy, VerifiedCallback, ExtractJwt } from "passport-jwt";
import { RequestHandler } from "express";
import { sign } from "jsonwebtoken";

class PasseportStrategyFactory {


    private jwtOptions: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: 'tasmanianDevil'
    }

    public getJWTStrategy(): Strategy {
        return new Strategy(this.jwtOptions, this.verifyCallBack);
    }

    public getLoginFunction(): RequestHandler {
        return (req, res) => {

            console.log(req.body)
            const user = this.getAuthUser(req.body.name, req.body.password)

            if (!user) {
                res.status(401).json({
                    message: "utilisateur impossible à identifier"
                });
            }
            else {
                var payload = {
                    id: user.id
                };
                var token = sign(payload, this.jwtOptions.secretOrKey);
                res.json({
                    message: "ok",
                    token: token
                });
            }

        }
    }

    
    private verifyCallBack(payload: any, done: VerifiedCallback): void {

        let user
        if (payload.id === "jordane") {
            user = {
                name: "jordane"
            }
        }

        done(null, user ? user : user);
    }

    //This logic must be move away
    private getAuthUser(login: string, pwd: string): any {
        let user

        if (login && login === "jordane" && pwd && pwd === "test") {
            user = {
                name: "jordane",
                password: "test"
            }
        }

        return user
    }

}

export const passeportStrategyFactory: PasseportStrategyFactory = new PasseportStrategyFactory();

