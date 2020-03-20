import * as restify from 'restify'
import * as jwt from 'jsonwebtoken'
import { environment } from '../common/environment';

import { MessageRespose } from '../common/router';
import * as bcrypt from 'bcryptjs';
//import { User } from '../viewModel/model/users';

export const tokenParser = (req, resp, next, dbs) => {
  const token = extractToken(req)
  if (token) {
    jwt.verify(token, environment.jwt.secret, applyBearer(req, resp, next, dbs))
  } else {
    MessageRespose.error(resp, next, "Token inválido", 401);
  }
}

function extractToken(req: restify.Request) {
  let token = undefined
  const authorization = req.header('authorization')
  if (authorization) {
    const parts: string[] = authorization.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1]
    }
  }
  return token;
}

function applyBearer(req: restify.Request, resp, next, dbs): (error, decoded) => void {
  return (error, decoded) => {
    if (decoded) {
      // User.findById(decoded.id).then(user => {
      //   if (user) {
      //     (<any>req).authenticated = user;
      //     next();
      //   } else {
      //     MessageRespose.error(resp, next, "Token inválido", 401);
      //   }
      // }).catch(next)
    } else {
      MessageRespose.error(resp, next, "Token inválido", 401);
    }
  }
}

export const bcryptPassword = (password): Promise<any> => {
  return bcrypt.hash(password, environment.bcrypt.salt);
}
