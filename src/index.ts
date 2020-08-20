import "reflect-metadata";
import {createConnection} from "typeorm";
import {User, UserRole} from "./entity/User";
import crypto from 'crypto';
const pwhash = (contents: string, salt: string) => {
    return crypto.pbkdf2Sync(contents, salt, 1000, 64,'sha512').toString('hex');
}
createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.email = "test@gmail.com";
    user.role = UserRole.admin
    user.salt = crypto.randomBytes(16).toString('hex');
    user.password = pwhash("test", user.salt);
    const result = await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);
    console.log(result);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
