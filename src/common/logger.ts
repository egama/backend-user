import * as bunyan from 'bunyan'
import { environment } from './environment';

export const logger = bunyan.createLogger({
    name: environment.app.name,
    level: (<any>bunyan).resolveLevel(environment.logger.level)
})