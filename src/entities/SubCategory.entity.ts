import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from "typeorm"
import { Category } from "./Category.entity";


@Entity()
export class SubCategory{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Category)
    category: Category

    @Column()
    name: string;

    @Column({unique: true})
    shortName: string;

    @CreateDateColumn()
    createdAt: Date
}