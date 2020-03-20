import * as _sequelize from 'sequelize';

export abstract class ModelDB<T> {
    constructor(sequelize: _sequelize.Sequelize) { }

    _entity: any;

    hasOne = (otherEntity, options) => {
        this._entity.hasOne(otherEntity, options);
    }

    hasMany = (otherEntity, options) => {
        this._entity.hasMany(otherEntity, options); 
    }
    
}