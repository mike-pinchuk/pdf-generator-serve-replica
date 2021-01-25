import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ name: 'password_hash', nullable: false })
    passwordHash: string;
}
