import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany} from "typeorm"
import { SubCategory } from "./SubCategory.entity";
import { SubGroup } from "./SubGroup.entity";


@Entity()
export class Group{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> SubCategory, (subcategory)=> subcategory.groups)
    subCategory: SubCategory

    @Column()
    name: string;

    @Column({unique: true})
    shortName: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(()=> SubGroup, (subGroup)=> subGroup.group)
    subGroups: SubGroup[]
}