import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"


@Entity()
export class Category{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    shortName: string;

    @Column()
    createdAt: Date
}