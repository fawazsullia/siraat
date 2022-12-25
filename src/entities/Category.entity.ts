import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm"


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
}