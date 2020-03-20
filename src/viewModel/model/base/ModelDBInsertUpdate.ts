import * as _sequelize from 'sequelize';

export interface ModelDBInsert<T> {
    insert(data: T): Promise<T>;
    update(data: T): Promise<any>;
}