import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { Group } from "./Group.entity";


@Entity()
export class SubGroup{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Group)
    group: Group

    @Column()
    name: string;

    @Column({nullable: true})
    shortName: string;

    @Column()
    createdAt: Date
}