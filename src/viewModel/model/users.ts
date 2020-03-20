import * as bcrypt from 'bcryptjs'
import { environment } from '../../common/environment'
import { bcryptPassword } from '../../security/token.parser';
import * as _sequelize from 'sequelize';
import { customerDefine, userDefine } from './base/defines';
import { BaseEntity } from './base/baseEntity';
import { ModelDBGet } from './base/ModelDBGet';
import { ModelDBInsert } from './base/ModelDBInsertUpdate';
import { ModelDBDelete } from './base/ModelDBDelete';

const defineModel = (sequelize: _sequelize.Sequelize) => {
    return sequelize.define('user', userDefine);
}

export interface UserEntity extends BaseEntity {
    name: string;
    email: string;
    password: string;
    active: boolean;
}

export class UserModel extends ModelDBGet<UserEntity> implements ModelDBInsert<UserEntity>, ModelDBDelete<UserEntity> {
    readonly data: UserEntity;

    constructor(sequelize: _sequelize.Sequelize) {
        super(sequelize);

        this._entity = defineModel(sequelize);
    }

    insert = async (data: UserEntity) => {
        if (data.password) {
            data.password = await bcryptPassword(data.password);
        }

        return this._entity.create({
            name: data.name,
            email: data.email,
            password: data.password,
            active: data.active
        });
    };

    update = async (data: UserEntity) => {
        return this._entity.udpate({
            name: data.name,
            email: data.email,
            password: data.password,
            active: data.active
        }, {
            returning: true, where: { id: data.id }
        });
    }

    delete = async (id: number) => {
        const value: any = await this.getById(id);
        value.active = true;
        this._entity.update(value.dataValues, { where: { id: 1 } })
    }
}