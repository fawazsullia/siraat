import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"
import { UserType } from "../enums/UserType.enum";
import { CountryList } from "../enums/CountryList.enum.js";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    contactNumber: string;

    @Column()
    type: UserType;

    @Column()
    address: string;

    @Column({nullable: true})
    country: CountryList;

    @Column({nullable: true})
    locationTag: string;

    @Column({nullable: true})
    rating: number;

    @Column({nullable: true})
    whatsappNumber: string;

}

