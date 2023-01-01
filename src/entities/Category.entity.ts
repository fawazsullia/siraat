import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm"
import { SubCategory } from "./SubCategory.entity";


@Entity()
export class Category{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({nullable: true, unique: true})
    shortName: string;

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(()=> SubCategory, (subCategory)=> subCategory.category)
    subCategories: SubCategory[]
}