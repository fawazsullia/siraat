import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from "typeorm"
import { SubCategory } from "./SubCategory.entity";


@Entity()
export class Group{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> SubCategory)
    subCategory: SubCategory

    @Column()
    name: string;

    @Column({unique: true})
    shortName: string;

    @CreateDateColumn()
    createdAt: Date
}