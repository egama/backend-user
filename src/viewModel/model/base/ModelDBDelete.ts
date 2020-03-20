import * as _sequelize from 'sequelize';

export interface ModelDBDelete<T> {
    delete(id: number): void;
}