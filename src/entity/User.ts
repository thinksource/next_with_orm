import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, BeforeInsert, Connection} from "typeorm";
import crypto from 'crypto';
import _ from 'lodash';
import { Organization } from "./Organization";
import { getDatabaseConnection} from "../../lib/db";
// export type UserState = "active" | "deactive"
export enum UserRole {
    admin = "admin",
    active = "active",
    blocked = "blocked"
}  

export const pwhash = (contents: string, salt: string) => crypto.pbkdf2Sync(contents, salt, 1000, 64,'sha512').toString('hex');


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

    @BeforeInsert()
    generatePasswordDigest(){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.password = pwhash(this.password, this.salt);

    }

    toJSON() {
        return _.omit(this, ['password', 'errors', 'salt']);
    }

}
