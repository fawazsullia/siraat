import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { Category } from "./Category.entity";


@Entity()
export class SubCategory{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Category)
    category: Category

    @Column()
    name: string;

    @Column({nullable: true})
    shortName: string;

    @Column()
    createdAt: Date
}