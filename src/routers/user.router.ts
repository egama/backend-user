import * as restify from "restify";

import { Router } from '../common/router';
import { tokenParser } from "../security/token.parser";
import { DBs } from "../viewModel/model";

class UserRouter extends Router {

    applyRoutes(dbs: DBs, application: restify.Server, prefix: string) {

        const _tokenParser = (req, resp, next) => {
            return (tokenParser(req, resp, next, dbs));
        }

        application.get(prefix + '/user', [async (req, resp, next) => {
            try {
                debugger
                const result = await dbs.user.getAll();
                return this.success(resp, next, result);
            }
            catch (err) {
                return this.error(resp, next, err);
            }
        }]);

        application.get(prefix + '/user/:id', [async (req, resp, next) => {
            try {
                const { id } = req.params;

                const result = await dbs.user.getById(id);
                return this.success(resp, next, result);
            }
            catch (err) {
                return this.error(resp, next, err);
            }
        }]);

        application.post(prefix + '/user', [async (req, resp, next) => {
            try {
                const { name, email, password } = req.body;
                const data = await dbs.user.insert({ name, email, password, active: true });
                return this.success(resp, next, data);
            }
            catch (err) {
                return this.error(resp, next, err);
            }
        }]);

        application.put(prefix + '/user/:id', [async (req, resp, next) => {
            try {
                const { name, email, password, active } = req.body;
                const { id } = req.params;
                
                let user = await dbs.user.getById(id);
                const pass = password || user.password;

                await dbs.user.update({
                    id: user.id,
                    name: name,
                    email: email,
                    password: pass,
                    active: active,
                });

                return this.success(resp, next);
            }
            catch (err) {
                return this.error(resp, next, err);
            }
        }]);

        application.del(prefix + '/user/:id', [async (req, resp, next) => {
            try {
                const { id } = req.params;

                await dbs.user.delete(id)

                return this.success(resp, next);
            }
            catch (err) {
                return this.error(resp, next, err);
            }
        }]);
    }
}

export const userRouter = new UserRouter();