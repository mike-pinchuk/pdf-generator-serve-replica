import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string

    @Column()
    email: string

    @Column({ name: 'password_hash' })
    passwordHash: string
}