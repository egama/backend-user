import * as restify from "restify";
import { environment } from "./common/environment"
import { Router } from "./common/router";
import * as _sequelize from 'sequelize';
import { logger } from "./common/logger";
import * as corsMiddleware from 'restify-cors-middleware'
import { createModels, DBs } from "./viewModel/model";
import mysql2 from 'mysql2';

export class Server {

    aplication: restify.Server;

    initRoutes(dbs: DBs, routers: Router[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.aplication = restify.createServer({
                    name: environment.app.name,
                    version: environment.app.version,
                    log: logger
                });

                const corsOptions: corsMiddleware.Options = {
                    origins: ['*'],
                    allowHeaders: ['*'],
                    exposeHeaders: ['*']
                }

                const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions);

                this.aplication.pre(cors.preflight);
                this.aplication.pre(restify.plugins.requestLogger({
                    log: logger
                }))

                this.aplication.use(cors.actual);
                this.aplication.use(restify.plugins.bodyParser({
                    maxBodySize: 30000
                }));

                this.aplication.use(restify.plugins.queryParser())

                // //Routes
                for (let route of routers) {
                    route.applyRoutes(dbs, this.aplication, '/api');
                }

                this.aplication.listen(environment.app.port, () => {
                    resolve(this.aplication);
                })
            } catch (error) {
                reject(error);
            }
        });
    }

    initializeDb() {
        const sequelize = new _sequelize.Sequelize('AppGado', 'app-gado', 'OIIJKhjvLEB7Pq7J', {
            host: '34.95.233.76',
            dialect: 'mysql',
            dialectModule: mysql2,
            dialectOptions: { decimalNumbers: true }
        })
        sequelize.authenticate()
        return sequelize;
    }

    bootstrap(routers: Router[] = []): Promise<Server> {
        const sequelize = this.initializeDb();
        const dbs = createModels(sequelize);
        return this.initRoutes(dbs, routers);
    }
}