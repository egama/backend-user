import * as _sequelize from 'sequelize';
import { customerDefine } from './base/defines';
import { ModelDB } from './base/ModelDB';
import { BaseEntity } from './base/baseEntity';
import { ModelDBGet } from './base/ModelDBGet';
import { ModelDBInsert } from './base/ModelDBInsertUpdate';

const defineModel = (sequelize: _sequelize.Sequelize) => {
    return sequelize.define('customer', customerDefine);
}

export interface CustomerEntity extends BaseEntity {
    phone: string;
    document: string;
    status: string;
    idUser: number; 
}

export class CustomerModel extends ModelDB<CustomerEntity> implements ModelDBGet<CustomerEntity>
    , ModelDBInsert<CustomerEntity>  {

    readonly data: CustomerEntity;

    constructor(sequelize: _sequelize.Sequelize) {
        super(sequelize);

        this._entity = defineModel(sequelize);
    }

    insert = async (data: CustomerEntity) => {
        return this._entity.create({
            phone: data.phone,
            document: data.document,
            status: data.status,
            idUser: data.idUser
        });
    };

    update = async (data: CustomerEntity) => {
        return this._entity.udpate({
            phone: data.phone,
            document: data.document,
            status: data.status,
            idUser: data.idUser
        }, {
            returning: true, where: { id: data.id }
        });
    }

    getById = async (id: number): Promise<CustomerEntity> => {
        return this._entity.findByPk(id);
    }

    getAll = async (): Promise<CustomerEntity[]> => {
        return this._entity.findAll();
    }

    getByAnything = async (fn): Promise<CustomerEntity> => {
        return this._entity.findOne({ where: fn });
    }
}