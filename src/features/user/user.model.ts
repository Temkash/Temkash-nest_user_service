import { BaseEntity } from "common/base.model";
import { Column, DeleteDateColumn, Entity } from "typeorm";


@Entity()
export class User extends BaseEntity{
    @Column({ unique: true })
    login: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    age: number;

    @Column()
    description: string;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
}