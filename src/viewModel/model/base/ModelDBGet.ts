import * as _sequelize from 'sequelize';
import { ModelDB } from './ModelDB';

export class ModelDBGet<T> extends ModelDB<T> {

    getById = async (id: number): Promise<T> => {
        return this._entity.findByPk(id);
    }

    getAll = async (): Promise<T[]> => {
        return this._entity.findAll();
    }

    getByAnything = async (fn): Promise<T> => {
        return this._entity.findOne({ where: fn });
    }
}