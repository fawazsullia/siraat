import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { SubCategory } from "./SubCategory.entity";


@Entity()
export class Group{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> SubCategory)
    subCategory: SubCategory

    @Column()
    name: string;

    @Column({nullable: true})
    shortName: string;

    @Column()
    createdAt: Date
}