import http from 'http';

// how to get port from server address
//import AddressInfo from net module
import { AddressInfo } from 'net'

import configuration from '../config';
import app from './../src/app';

const config = configuration[process.env.NODE_ENV || 'development']
const service = app(config);
const log = config.log()

const server = http.createServer(service)

server.listen(process.env.PORT || 5000);

// cast address from express app as AddressInfo
const { port } = server.address() as AddressInfo
server.on('listening', () => {
    log.info(`Hi there, I am listing on port ${port} in ${service.get('env')} mode`)
});