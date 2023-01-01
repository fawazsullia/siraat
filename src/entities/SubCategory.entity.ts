import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany} from "typeorm"
import { Category } from "./Category.entity";
import { Group } from "./Group.entity";


@Entity()
export class SubCategory{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Category, (category)=> category.subCategories)
    category: Category

    @Column()
    name: string;

    @Column({unique: true})
    shortName: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(()=> Group, (group)=> group.subCategory)
    groups: Group[];
}