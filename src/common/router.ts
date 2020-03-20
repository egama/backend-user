import * as restify from "restify";
import { EventEmitter } from "events";
import { DefaultResponse } from '../viewModel/deafultResponse'
import { DBs } from "../viewModel/model";

export abstract class Router extends EventEmitter {
    abstract applyRoutes(dbs: DBs,application: restify.Server, prefix: string)

    success(response: restify.Response, next: restify.Next, data: any = null, message = null) {
        MessageRespose.success(response, next, data, message);
    }

    error(response: restify.Response, next: restify.Next, error: any) {
        MessageRespose.error(response, next, error);
    }

    errorData(response: restify.Response, next: restify.Next, error: any, data: any) {
        MessageRespose.errorData(response, next, error, data);
    }
}

export class MessageRespose {
    static success(response: restify.Response, next: restify.Next, data: any = null, message) {
        let resp: DefaultResponse = new DefaultResponse();
        resp.success(data, message);
        response.json(resp);

        return next();
    }

    static error(response: restify.Response, next: restify.Next, error: any, errorNumber = 400) {
        return this.errorData(response, next, error, null, errorNumber);
    }

    static errorData(response: restify.Response, next: restify.Next, error: any, data: any, errorNumber = 400) {
        let resp: DefaultResponse = new DefaultResponse();

        resp.addErro(error.message || error, error.field, data);
        response.send(errorNumber, resp);

        return next(false);
    }
}