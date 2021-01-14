import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string

    @Column()
    email: string

    @Column()
    passwordHash: string
}