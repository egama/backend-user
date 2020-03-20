import * as restify from "restify";

import { Router } from '../common/router';
import { tokenParser } from "../security/token.parser";
import { DBs } from "../viewModel/model";
import * as dateFormat from "dateformat";

class Profitability {
    date: string;
    value: number;
    perMonth: number;

    constructor(date: string, value: number, perMonth: number) {
        this.date = date;
        this.value = value;
        this.perMonth = perMonth;
    }
}

class RespSimulator {
    dateRequest: string;
    profPerMonth: number;
    profitabilityTotal: number;
    valueFinal: number;
    valueArr: number;
    results: Profitability[]

    constructor(dateRequest: string, profPerMonth: number) {
        this.dateRequest = dateRequest;
        this.profPerMonth = profPerMonth;
        this.results = [];
    }

    add(result: Profitability) {
        this.results.push(result);
    }
}

class SimulatorRouter extends Router {


    applyRoutes(dbs: DBs, application: restify.Server, prefix: string) {

        const _tokenParser = (req, resp, next) => {
            return (tokenParser(req, resp, next, dbs));
        }

        application.post(prefix + '/simulator', [async (req, resp, next) => {
            try {
                const { qtdArr, plan } = req.body;
                debugger;
                const period = await dbs.period.getByAnything({ month: plan });
                var today = dateFormat(new Date(), "dd/mm/yyyy");
                const result = new RespSimulator(today, period.profitability);
                result.valueArr = 150; //TODO: get from db

                for (var i = 1; i <= plan; i++) {
                    const newdate = new Date(new Date().setMonth(new Date().getMonth() + i));
                    var newdate_form = dateFormat(newdate, "dd/mm/yyyy");

                    const valuePerMonth = ((result.valueArr * period.profitability) / 100) * qtdArr;

                    result.add(new Profitability(newdate_form, result.valueArr, valuePerMonth));
                }

                result.profitabilityTotal = result.results.map(x => x.perMonth).reduce((a, b) => a + b, 0);
                result.valueFinal = (qtdArr * result.valueArr) + result.profitabilityTotal;

                return this.success(resp, next, result);
            }
            catch (err) {
                return this.error(resp, next, err);
            }
        }]);
    }
}

export const simulatorRouter = new SimulatorRouter();