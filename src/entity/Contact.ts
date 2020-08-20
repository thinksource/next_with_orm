import {Entity, Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { ExecSyncOptionsWithBufferEncoding } from "child_process";
import { Person } from "./Person";
export enum PersonTitle {
    Mr = "Mr",
    Miss = "Miss",
    Dr = "Dr",
    Mrs ="Mrs",
    Ms = "Ms",
    Blank = ""
}

@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({
        type: "enum",
        enum: PersonTitle,
        default: PersonTitle.Blank
        })
    title?: string;

    @Column('varchar')
    first_name!: string;

    @Column('varchar')
    last_name!: string;

    @Column('varchar')
    job_title!: string;

    @Column('varchar')
    email!: string;

    @Column('tinyint')
    member!: boolean;

    @Column('varchar')
    country!: string;

    @Column('varchar')
    state!: string;

    @ManyToOne(type=> Person, p => p.contact)
    person!: Person;
}
