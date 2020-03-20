import * as restify from "restify";

import { Router } from '../common/router';
import { tokenParser } from "../security/token.parser";
import { DBs } from "../viewModel/model";

class CustomerRouter extends Router {

    applyRoutes(dbs: DBs, application: restify.Server, prefix: string) {

        const _tokenParser = (req, resp, next) => {
            return (tokenParser(req, resp, next, dbs));
        }

        application.get(prefix + '/customer', [_tokenParser, async (req, resp, next) => {
            try {
                const result = await dbs.customer.getAll();
                return this.success(resp, next, result);
            }
            catch (err) {
                return this.error(resp, next, err);
            }
        }]);

        application.get(prefix + '/customer/:id', [async (req, resp, next) => {
            try {
                const { id } = req.params;

                const result = await dbs.customer.getById(id);
                return this.success(resp, next, result);
            }
            catch (err) {
                return this.error(resp, next, err);
            }
        }]);

        application.post(prefix + '/customer', [async (req, resp, next) => {
            try {
                const { name, email, password, phone, document } = req.body;

                debugger;
                const dataUser = await dbs.user.insert({ name, email, password, active: true });

                const data = await dbs.customer.insert({ phone, document, status: 'await-document', idUser: dataUser.id });
                return this.success(resp, next, data);
            }
            catch (err) {
                return this.error(resp, next, err);
            }
        }]);

        application.put(prefix + '/customer/:id', [async (req, resp, next) => {
            try {
                const { name, email, password, phone, document, status, active } = req.body;
                const { id } = req.params;
                debugger;
                let user = await dbs.user.getById(id);
                await dbs.user.update({ id: user.id, name, email, password, active });

                let customer = await dbs.customer.getByAnything({ idUser: id });
                await dbs.customer.update({ id: customer.id, phone, document, status, idUser: id });

                return this.success(resp, next);
            }
            catch (err) {
                return this.error(resp, next, err);
            }
        }]);
    }
}

export const customerRouter = new CustomerRouter();