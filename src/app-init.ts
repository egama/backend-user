import { Server } from './app-server'

import * as R from './routers';

const server = new Server();
server.bootstrap([
    R.authRouter,
    R.userRouter,
    R.customerRouter,
    R.simulatorRouter
]).then(app => {
    console.log('iniciou');
}).catch(error => {
    console.log('Erro ao iniciar');
    console.error(error);
    process.exit(1);
});