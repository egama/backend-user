import * as _sequelize from 'sequelize';
import { userDefine, customerDefine, periodDefine } from './defines';

export class Init {
    static createDBs = async (sequelize: _sequelize.Sequelize) => {
        const period = sequelize.define('period', periodDefine);
        period.sync();

        const user = sequelize.define('user', userDefine);
        user.sync();

        const customer = sequelize.define('customer', customerDefine);
        (user as any).hasMany(customer, { as: 'customers', foreignKey: 'idUser' })
        customer.sync();
    } 
}