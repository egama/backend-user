import { UserModel } from './users';
import { PeriodModel } from './period';
import { CustomerModel } from './customer';

import * as _sequelize from 'sequelize';
import { Init } from './base/init';

export interface DBs {
    user: UserModel,
    customer: CustomerModel,
    period: PeriodModel,
}

export const createModels = (sequelize: _sequelize.Sequelize) => {
    Init.createDBs(sequelize);

    const dbs: DBs = {
        user: new UserModel(sequelize),
        customer: new CustomerModel(sequelize),
        period: new PeriodModel(sequelize),
    } 

    return dbs;
}