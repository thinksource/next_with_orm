import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { User } from "./User";
import {Contact} from "./Contact";
import { Organization } from "./Organization";

@Entity()
export class Person {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(type => User)
    @JoinColumn()
    user!: User;


    @ManyToOne(type => Organization, org => org.people)
    belong_organization!: Organization;

    @Column("simple-array")
    expertise?: string[];

    @Column("boolean")
    COVID_19!: boolean;

    @OneToMany(type => Contact, contact => contact.person)
    contact?: Contact[];
}
