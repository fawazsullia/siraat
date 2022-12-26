import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from "typeorm"
import { Group } from "./Group.entity";


@Entity()
export class SubGroup{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Group, (group)=> group.subGroups)
    group: Group

    @Column()
    name: string;

    @Column({unique: true})
    shortName: string;

    @CreateDateColumn()
    createdAt: Date
}