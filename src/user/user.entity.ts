import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id!: string;

    @Column({ unique: true, nullable: false })
    email!: string;

    @Column({ name: 'password_hash', nullable: false, select: false })
    passwordHash!: string;

    @OneToMany(() => PostEntity, (post) => post.user)
    @JoinColumn({name: 'id'})
    posts?: PostEntity[];
}
