import * as _sequelize from 'sequelize';
import { customerDefine, periodDefine } from './base/defines';
import { ModelDB } from './base/ModelDB';
import { BaseEntity } from './base/baseEntity';
import { ModelDBGet } from './base/ModelDBGet';
import { ModelDBInsert } from './base/ModelDBInsertUpdate';

const defineModel = (sequelize: _sequelize.Sequelize) => {
    return sequelize.define('period', periodDefine);
}

export interface PeriodEntity extends BaseEntity {
    month: number;
    profitability: number;
}

export class PeriodModel extends ModelDB<PeriodEntity> implements ModelDBGet<PeriodEntity> {

    readonly data: PeriodEntity;

    constructor(sequelize: _sequelize.Sequelize) {
        super(sequelize);

        this._entity = defineModel(sequelize);
    }

    getById = async (id: number): Promise<PeriodEntity> => {
        return this._entity.findByPk(id);
    }

    getAll = async (): Promise<PeriodEntity[]> => {
        return this._entity.findAll();
    }

    getByAnything = async (fn): Promise<PeriodEntity> => {
        return this._entity.findOne({ where: fn });
    }
}