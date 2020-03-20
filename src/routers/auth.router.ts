import * as restify from "restify";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { Router } from '../common/router'
import { environment } from '../common/environment'
import { DBs } from "../viewModel/model";

class AuthRouter extends Router {
    applyRoutes(dbs: DBs, application: restify.Server, prefix: string) {

        application.post(prefix + '/auth', async (req, resp, next) => {
            try {
                const { email, password } = req.body;
                debugger;
                const user = await dbs.user.getByAnything({ email });

                if (user && user.id && await bcrypt.compare(password, user.password)) {
                    const token = await jwt.sign({ id: user.id }, environment.jwt.secret);
                    let data = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        sigla: this.sigla(user.name),
                        token
                    };
                    this.success(resp, next, data);
                } else {
                    this.error(resp, next, "Email or Password not found");
                }
            }
            catch (err) {
                return this.error(resp, next, err);
            }
        });
    }


    private sigla(fullName: string) {
        const slp = fullName.trim().split(' ');
        if (slp.length > 1) {
            return (slp[0].substr(0, 1) + slp[1].substr(0, 1)).toUpperCase();
        } else {
            return slp[0].substr(0, 2).toUpperCase();
        }
    }
}

export const authRouter = new AuthRouter();