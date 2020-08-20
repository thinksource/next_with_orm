import {createConnection, getConnectionManager} from 'typeorm';
import 'reflect-metadata';
import config from '../ormconfig.json';

const create = async () => {
    console.log(process.env)
    // @ts-ignore
    return createConnection({
        ...config,
        host: process.env.NODE_ENV === 'production' ? 'localhost' : config.host,
        database: process.env.NODE_ENV === 'production' ? 'table_production' : 'table_development',
    });
};

const promise = (async function () {
    const manager = getConnectionManager();
    const current = manager.has('default') && manager.get('default');
    if (current) {await current.close();}
    return create();
})();

export const getDatabaseConnection = async () => {
    return promise;
};