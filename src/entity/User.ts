import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, BeforeInsert, Connection} from "typeorm";
import crypto from 'crypto';
import _ from 'lodash';
import { Organization } from "./Organization";
import { getDatabaseConnection, dbManager } from "../../lib/db";
// export type UserState = "active" | "deactive"
export enum UserRole {
    admin = "admin",
    active = "active",
    blocked = "blocked"
}  

const pwhash = (contents: string, salt: string) => crypto.pbkdf2Sync(contents, salt, 1000, 64,'sha512').toString('hex');


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar')
    @Index()
    email!: string;

    @Column('varchar')
    password!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: 'active'
    })
    role!: UserRole;

    @Column('varchar')
    salt!: string;

    errors?: string[];

    // @Column({
    //     type: 'enum',
    //     emun: ["admin", "active", 'deactive'],
    //     default: 'active'
    // })
    // role: UserRole
    async validate(pw: string){
        this.errors = new Array();
        if(this.password! = pw)this.errors.push('password do not match of two input');
        if(this.email.length == 0) this.errors.push('username can not empty');
        if(this.password.length == 0) this.errors.push('password can not empty');
        const conn : Connection= await getDatabaseConnection()
        const found = await conn.manager.find(
            User, {email: this.email});
        if (found.length> 0)
            this.errors.push('user email already exist')
        
        return  this.errors.length == 0? true: false;
    }

    @BeforeInsert()
    generatePasswordDigest(){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.password = pwhash(this.password, this.salt);

    }

    toJSON() {
        return _.omit(this, ['password', 'errors', 'salt']);
    }

}
