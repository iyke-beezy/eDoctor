import bunyan from 'bunyan';

import pjs from '../package.json';

const { name, version } = pjs;

const getLogger = (serviceName: string, serviceVersion: string, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level })

const development = {
    name,
    version,
    serviceTimeOut: 30,
    log: () => getLogger(name, version, 'debug')
}

const production = {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'info'),
}

const test = {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'fatal'),
}

export default {
    development,
    production,
    test
}
