import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { Category } from "./Category.entity";
import { Group } from "./Group.entity";
import { SubCategory } from "./SubCategory.entity";
import { SubGroup } from "./SubGroup.entity";
import { User } from "./User.entity";

@Entity()
export class Product{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(()=> Category)
    category: Category;

    @ManyToOne(()=> SubCategory)
    subCategory: SubCategory;

    @ManyToOne(()=> Group)
    group: Group;

    @ManyToOne(()=> SubGroup)
    subGroup: SubGroup;

    @Column()
    description: string;

    @ManyToOne(()=> User)
    seller: User;

    @Column()
    price: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    rating: number;

    @Column()
    isBoosted: boolean;

    @Column()
    tier: string;
}