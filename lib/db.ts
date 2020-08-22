import {createConnection, getConnectionManager} from 'typeorm';
import 'reflect-metadata';
import config from '../ormconfig.json';

const create = () => {
    console.log(config);
    // @ts-ignore
    return createConnection({
        ...config
    });
};

// const promise = (async function () {
//     const manager = getConnectionManager();
//     const current = manager.has('default') ? manager.get('default'):await create();
//     // if (current) {await current.close();}
//     return current;
// })();

export const getDatabaseConnection = async () => {
    console.log("=====================");
    const manager = getConnectionManager();
    const current = manager.has('default') ? manager.get('default'): (await create());
    return current;
};
