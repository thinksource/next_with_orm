import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import { CipherNameAndProtocol } from "tls";
import { User } from "./User";
import { Person } from "./Person";
import { Project } from "./Project";
import { Technology } from "./Technology";

@Entity()
export class Organization {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar')
    name!: string;

    @Column('text')
    brief?: string;

    @Column({
        type: "enum",
        enum: ["active", "deactive"],
        default: 'active'
    })
    status!: string;

    @Column('varchar')
    website!: string;

    @Column('simple-array')
    mailext!: string[];

    @ManyToOne(type => Person, p => p.belong_organization)
    people?: Person[];

    @ManyToOne(type => Project, p => p.organization)
    project?: Project[];

    @ManyToOne(type => Technology, t => t.organization)
    technology?: Technology[];

    @Column('tinyint')
    member!: boolean;

}
