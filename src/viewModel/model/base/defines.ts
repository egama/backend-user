import * as _sequelize from 'sequelize';

export const customerDefine = {
    phone: {
        type: _sequelize.STRING
    },
    document: {
        type: _sequelize.STRING
    },
    status: {
        type: _sequelize.STRING
    },
    idUser: {
        type: _sequelize.INTEGER
    } 
}

export const periodDefine = {
    month: {
        type: _sequelize.INTEGER
    },
    profitability: {
        type: _sequelize.DECIMAL(10, 2)
    }
}

export const userDefine = {
    name: {
        type: _sequelize.STRING
    },
    email: {
        type: _sequelize.STRING
    },
    password: {
        type: _sequelize.STRING
    },
    active: {
        type: _sequelize.BOOLEAN
    }
} 