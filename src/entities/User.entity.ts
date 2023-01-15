import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"
import { CountryList, UserType, InternalUserType } from "../enums";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column()
    email: string;

    @Column({nullable: true})
    contactNumber: string;

    @Column()
    type: UserType;

    @Column({nullable: true})
    address: string;

    @Column({nullable: true})
    country: CountryList;

    @Column({nullable: true})
    locationTag: string;

    @Column({nullable: true})
    rating: number;

    @Column({nullable: true})
    whatsappNumber: string;

    @Column({nullable: true})
    companyId: number;

    @Column({enum: InternalUserType})
    internalUserType: InternalUserType;

    @Column()
    password: string;

}

